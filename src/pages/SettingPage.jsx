import React from "react";
import Header from "../components/SettingPage/Header";
import { Outlet } from "react-router-dom";
import SideBar from "../components/HomePage/SideBar";

const SettingPage = () => {
  const options = [{ label: "profile", path: "" }];
  return (
    <>
      <SideBar />
      <div className="bg-white ml-12 md:mx-80 min-w-sm flex flex-grow flex-col mt-14">
        <Header options={options} />
        <Outlet />
      </div>
    </>
  );
};

export default SettingPage;
