import { Page01 } from "../components/RegisterForm/Page01";
import Page02 from "../components/RegisterForm/Page02";
import Page03 from "../components/RegisterForm/Page03";
import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Progress from "../components/Progress";
import { useSignupUserMutation } from "../store";
import { FaSpinner } from "react-icons/fa";
import Alert from "../components/Alert";
import LoadingDot from "../components/Loading/LoadingDot";

const RegisterModel = ({ onChange, onLogin }) => {
  const [page, setPage] = useState(0);
  const [time, setTime] = useState();

  const options = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    birthday: "",
    username: "",
    gender: "",
  });

  const [signupUser, results] = useSignupUserMutation();
  const handleNav = () => {
    onChange();
    onLogin();
  };

  let content = "";

  const handleNextPage = (e) => {
    e.preventDefault();
    setPage(page + 50);
  };
  const handleLastPage = (e) => {
    e.preventDefault();
    setPage(page - 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser(formData);
    console.log(results);
  };

  if (page == 0) {
    content = (
      <Page01
        options={options}
        setFormData={setFormData}
        formData={formData}
        setPage={setPage}
        handleNextPage={handleNextPage}
      />
    );
  } else if (page == 50) {
    content = (
      <Page02
        handleNextPage={handleNextPage}
        handleLastPage={handleLastPage}
        setFormData={setFormData}
        formData={formData}
      />
    );
  } else if (page == 100) {
    content = (
      <Page03
        handleLastPage={handleLastPage}
        handleSubmit={handleSubmit}
        formData={formData}
      />
    );
  }
  if (results.isLoading) {
    content = <FaSpinner className="animate-spin" />;
  } else if (results.isError) {
    if (results.error.status === 422) {
      content = (
        <div>
          <Alert error={"Already signed up "} className="text-3xl" />
          <Button primary rounded className="my-8" onClick={handleNav}>
            Login
          </Button>
        </div>
      );
    }
  } else if (results.isSuccess) {
    let t = 1000;
    setTimeout(() => {
      handleNav();
    }, t);
    content = (
      <div className="flex items-center gap-2">
        <h1 className="text-3xl">Redirect now</h1>
        <LoadingDot className="bg-black" />
      </div>
    );
  }

  return (
    <Modal onChange={onChange}>
      <Progress page={page} />

      {content}
    </Modal>
  );
};

export default RegisterModel;