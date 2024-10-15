import React, { useState } from "react";
import Modal from "../components/Modal";
import Input from "../components/Input";
import Button from "../components/Button";
import { useSigninUserMutation } from "../store";
import LoadingFancy from "../components/Loading/LoadingFancy";
import Alert from "../components/Alert";

const LoginModel = ({ onChange, onRegister, onForget }) => {
  const [signinUser, results] = useSigninUserMutation();
  const [error, setError] = useState("");
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
      if (error.originalStatus === 401) {
        setError("email or password is not correct");
      } else {
        setError("internal server error ");
        console.log(error);
      }
    }
  };
  let content;
  if (results.isLoading) {
    content = (
      <div className="w-full h-full flex items-center justify-center gap-2">
        <LoadingFancy />
      </div>
    );
  } else {
    content = (
      <form action="" className="">
        {error && <Alert error={error} />}
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

        <Button
          rounded
          className="w-full my-4"
          onClick={() => {
            onChange();
            onForget();
          }}
        >
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
  }

  return <Modal onChange={onChange}>{content}</Modal>;
};

export default LoginModel;
