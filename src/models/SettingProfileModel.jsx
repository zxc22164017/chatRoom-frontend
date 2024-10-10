import React, { useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Input from "../components/Input";
import Dropdown from "../components/Dropdown";
import Alert from "../components/Alert";

const SettingProfileModel = ({
  onChange,
  type,
  formData,
  setFormData,
  handleSubmit,
}) => {
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [gender, setGender] = useState();
  const options = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
  ];
  const handleDropDown = (e) => {
    setFormData({ ...formData, gender: e.value });
    setGender(e);
  };
  const handleConfirm = (e) => {
    setConfirm(e.target.value);
    if (e.target.value !== formData?.password) {
      setError("Password is NOT Match");
    } else {
      setError("");
    }
  };
  let input;
  if (type === "username") {
    input = (
      <Input
        type={"text"}
        text={"username"}
        value={formData.username}
        onChange={(e) => {
          setFormData({ ...formData, username: e.target.value });
        }}
      />
    );
  } else if (type === "password") {
    input = (
      <>
        <Input
          type={"password"}
          text={"new password"}
          id={"patchpassword"}
          autoComplete="new-password"
          value={formData.patchPassword}
          onChange={(e) =>
            setFormData({ ...formData, patchPassword: e.target.value })
          }
        />
        <Input
          className="my-0"
          type={"password"}
          text={"confirm new password"}
          id={"confirm password"}
          onChange={handleConfirm}
          value={confirm}
        />
      </>
    );
  } else if (type === "email") {
    input = (
      <Input
        type={"email"}
        text={"email"}
        id={"email"}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
    );
  } else if (type === "birthday") {
    input = (
      <Input
        value={formData.birthday}
        type={"date"}
        text={"birthday"}
        onChange={(e) => {
          setFormData({ ...formData, birthday: e.target.value });
        }}
      />
    );
  } else if (type === "gender") {
    input = (
      <Dropdown
        className="mt-6"
        optClassname={"bg-white w-full"}
        options={options}
        onChange={handleDropDown}
        value={gender}
        text={"gender"}
      />
    );
  }

  return (
    <Modal className={"inset-y-32"} onChange={onChange}>
      <h1 className="text-xl font-semibold">Change {type}</h1>
      {error && <Alert error={error} />}
      {input}
      <Input
        className="my-2"
        type={"password"}
        text={"password"}
        id={"password"}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Button rounded primary={!error} onClick={handleSubmit} disabled={error}>
        save
      </Button>
    </Modal>
  );
};

export default SettingProfileModel;
