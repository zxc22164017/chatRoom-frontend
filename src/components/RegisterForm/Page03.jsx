import React, { useEffect, useState } from "react";
import Button from "../Button";

const Page03 = ({ handleLastPage, handleSubmit, formData }) => {
  const [error, setError] = useState("");

  useEffect(() => {
    const check = Object.values(formData);
    check.forEach((item) => {
      if (item === "") {
        setError("form is not complete");
      } else {
        setError("");
      }
    });
  }, [formData]);
  return (
    <form action="" className="">
      {error ? (
        <h1 className="font-bold font-sans text-red-800 text-center text-2xl my-8">
          OOPS! Form is not completed!!
        </h1>
      ) : (
        <h1 className="font-bold font-sans text-center text-2xl my-8">
          Congretulation!! click the button to submit
        </h1>
      )}

      {error ? (
        <Button
          disabled
          rounded
          className=" my-8 "
          onClick={handleSubmit}
        >
          Submit
        </Button>
      ) : (
        <Button primary rounded className=" my-8 " onClick={handleSubmit}>
          Submit
        </Button>
      )}

      <h2 className="text-lg ">Still need to change something?</h2>
      <Button
        secondary
        rounded
        className=" disabled:opacity-50"
        onClick={handleLastPage}
      >
        Last Page
      </Button>
    </form>
  );
};

export default Page03;
