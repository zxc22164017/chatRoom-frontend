import React from "react";
import Button from "../Button";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ options }) => {
  const location = useLocation();
  const nav = useNavigate();
  console.log(location.pathname);

  const renderButtons = options.map((option) => {
    const isCurrent =
      location.pathname === `/setting${option.path}` ? true : false;
    return (
      <Button
        rounded
        className={`w-24 border-none " ${isCurrent && "bg-slate-300"}`}
        key={option.label}
        onClick={() => [nav(`${option.path}`)]}
      >
        {option.label}
      </Button>
    );
  });
  return (
    <div className="px-6">
      <h1 className="text-3xl my-6 font-bold">Settings</h1>
      <div className="flex border-b-2 p-2 items-center justify-evenly">
        {renderButtons}
      </div>
    </div>
  );
};

export default Header;
