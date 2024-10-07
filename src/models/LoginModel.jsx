import React, { useState } from "react";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { useSigninUserMutation } from "../store";
import { useNavigate } from "react-router-dom";
import LoadingFancy from "../components/Loading/LoadingFancy";

const LoginModel = ({ onChange, onRegister }) => {
  const [signinUser, results] = useSigninUserMutation();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = await signinUser(formData).unwrap();
      localStorage.setItem("jwt", payload.token);
      setTimeout(() => {
        location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
  let content = (
    <form action="" className="">
      <h1 className="font-bold font-sans text-2xl my-8">Login</h1>
      <Input
        type={"email"}
        text={"email"}
        id={"email"}
        value={formData.email}
        onChange={(e) => {
          setFormData({ ...formData, email: e.target.value });
        }}
      />
      <Input
        type={"password"}
        text={"password"}
        id={"password"}
        value={formData.password}
        onChange={(e) => {
          setFormData({ ...formData, password: e.target.value });
        }}
      />

      <Button primary rounded className="w-full mt-8 " onClick={handleSubmit}>
        Login
      </Button>

      <Button rounded className="w-full my-4">
        Forget Password?
      </Button>
      <div className="mt-10">
        <p className="text-sm mt-4 text-center text-gray-600">
          Don't have an account yet?
        </p>
        <Button
          rounded
          secondary
          className="mt-4"
          onClick={() => {
            onChange();
            onRegister();
          }}
        >
          Register
        </Button>
      </div>
    </form>
  );
  if (!results.isUninitialized) {
    content = (
      <div className="w-full h-full flex items-center justify-center gap-2">
        <LoadingFancy />
      </div>
    );
  }

  return <Modal onChange={onChange}>{content}</Modal>;
};

export default LoginModel;
