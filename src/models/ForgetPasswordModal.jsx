import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Alert from "../components/Alert";
import { useForgetPasswordMutation } from "../store";
import LoadingFancy from "../components/Loading/LoadingFancy";

const ForgetPasswordModal = ({ onChange }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [forgetPassword, result] = useForgetPasswordMutation();
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const handleConfirm = (e) => {
    setConfirm(e.target.value);
    if (e.target.value !== formData?.password) {
      setError("Password is NOT Match");
    } else {
      setError("");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      forgetPassword(formData);
    }
  };
  useEffect(() => {
    if (result.isError) {
      console.log(result.error);
      if (result.error.status === 404) {
        setError("user not found");
      } else if (result.error.originalStatus === 400) {
        setError(result.error.data);
      } else {
        setError("Internal server error");
      }
    } else if (result.isLoading) {
      content = (
        <div className="flex flex-col flex-grow items-center justify-center">
          <LoadingFancy />
        </div>
      );
    } else if (result.isSuccess) {
      onChange();
    }
  }, [result]);

  let content = (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl text-center font-bold">Reset Password</h1>
      <Input
        type={"email"}
        text={"email"}
        id={"email"}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <Input
        type={"password"}
        text={"password"}
        id={"password"}
        autoComplete="new-password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Input
        type={"password"}
        text={"confirm password"}
        id={"confirm password"}
        onChange={handleConfirm}
        value={confirm}
      />
      <Button primary={!error} rounded disabled={error} className="mt-6">
        Submit
      </Button>
    </form>
  );

  return (
    <Modal className={"inset-y-32 justify-normal"} onChange={onChange}>
      {error && <Alert className="absolute top-4" error={error} />}
      {content}
    </Modal>
  );
};

export default ForgetPasswordModal;
