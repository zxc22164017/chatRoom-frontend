import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import Dropdown from "../Dropdown";
import Alert from "../Alert";
export function Page01({ options, formData, setFormData, handleNextPage }) {
  const [gender, setGender] = useState();
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState("");
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

  return (
    <form action="" className="">
      <h1 className="font-bold font-sans text-2xl my-8">
        Create your own account
      </h1>
      <Input
        type={"email"}
        text={"email"}
        id={"email"}
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <div className="relative">
        <Input
          type={"password"}
          text={"password"}
          id={"password"}
          autoComplete="new-password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Alert error={error} />
      </div>
      <Input
        type={"password"}
        text={"confirm password"}
        id={"confirm password"}
        onChange={handleConfirm}
        value={confirm}
      />
      <Input
        value={formData.birthday}
        type={"date"}
        text={"birthday"}
        onChange={(e) => {
          setFormData({ ...formData, birthday: e.target.value });
        }}
      />
      <Dropdown
        className="mt-6"
        options={options}
        onChange={handleDropDown}
        value={gender}
        text={"gender"}
      />

      <Button primary rounded className=" my-8 " onClick={handleNextPage}>
        Next
      </Button>
    </form>
  );
}
