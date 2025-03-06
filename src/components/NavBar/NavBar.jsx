import SearchBar from "./SearchBar";
import { useState } from "react";
import Button from "../Button";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import Notification from "./Notification";
import NavBarDropdown from "./NavBarDropdown";
import { BsPencilSquare } from "react-icons/bs";

import logo from "../../assets/logo.svg";
const NavBar = () => {
  const nav = useNavigate();

  const [show, setShow] = useState(false);

  return (
    <div className="fixed w-full top-0 z-20 shadow-lg">
      <div className="bg-contrast-900 h-14 shadow-lg flex justify-between items-center ">
        <div
          className="block md:flex h-14 md:pl-10 justify-center items-center hover:cursor-pointer"
          onClick={() => {
            nav("/");
          }}
        >
          <img className="w-14 h-14" src={logo} alt="logo" />
          <h1 className="hidden md:block text-white font-bold text-2xl">
            Fremo
          </h1>
        </div>
        <SearchBar show={show} setShow={setShow} />
        <div className="flex items-center gap-4 justify-between">
          <Button
            type="button"
            className="block md:hidden  w-10 rounded  border-none  p-0 "
            onClick={() => {
              setShow(!show);
            }}
          >
            <HiMagnifyingGlass className="w-full h-full text-white" />
          </Button>
          <Button
            onClick={() => {
              nav("/newPost");
            }}
            rounded
            className="h-14 w-14 border-none active:ring-0 active:scale-90"
          >
            <BsPencilSquare className="h-full w-full text-white" />
          </Button>
          <Notification />

          <NavBarDropdown />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
