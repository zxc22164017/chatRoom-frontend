import React from "react";
import dead from "../assets/dead.svg";
import four from "../assets/four.svg";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const imageClasses = classNames("w-64 h-64");
  const nav = useNavigate();

  return (
    <div
      onClick={() => {
        nav("/");
      }}
      className="flex flex-col h-screen animate-changeColor justify-center  items-center"
    >
      <div className="flex justify-center items-center">
        <img className={imageClasses} src={four} alt="" />
        <img
          className={`${imageClasses} animate-spinSlow `}
          src={dead}
          alt=""
        />
        <img className={imageClasses} src={four} alt="" />
      </div>
      <h1 className="text-3xl font-bold">Looks Like You Got Lost</h1>
      <p className=" text-xl font-semibold">Click anywhere to go back</p>
    </div>
  );
};

export default NotFound;
