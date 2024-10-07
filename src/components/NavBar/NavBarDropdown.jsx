import React from "react";
import Thumbnail from "../Thumbnails/Thumbnail";
import { useSelector, useDispatch } from "react-redux";
import Panel from "../Panel";
import { useState, useEffect, useRef } from "react";
import NavBarDropdownOption from "./NavBarDropdownOption";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useGetUserQuery, useLogoutMutation } from "../../store";

const NavBarDropdown = () => {
  const nav = useNavigate();
  const divElement = useRef();
  const [logout, result] = useLogoutMutation();
  const userInfo = useGetUserQuery().data;

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileNav = () => {
    setIsOpen(false);
    nav(`/profile/${userInfo._id}`);
  };
  const handleLogOut = () => {
    logout(userInfo._id);
    setIsOpen(false);
    localStorage.removeItem("jwt");
    nav("/");
    setTimeout(() => {
      location.reload();
    }, 500);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!divElement.current) {
        return;
      }
      if (!divElement.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, []);

  const option01 = (
    <NavBarDropdownOption onChange={handleProfileNav} className={" border-b-2"}>
      <Thumbnail className={"w-8 h-8"} image={userInfo?.thumbnail} />
      <h1 className="ml-2 font-semibold group-hover:text-sky-500">
        {userInfo?.username}
      </h1>
    </NavBarDropdownOption>
  );

  const option02 = (
    <NavBarDropdownOption onChange={handleLogOut}>
      <Thumbnail className={"h-8 w-8"}>
        <IoIosLogOut className="" />
      </Thumbnail>
      <h1 className="ml-2  group-hover:text-sky-500">Log out</h1>
    </NavBarDropdownOption>
  );

  return (
    <div className="relative mr-4 " ref={divElement}>
      <Thumbnail
        className={"w-10 h-10"}
        onClick={handleOpen}
        image={userInfo?.thumbnail}
      />
      {isOpen && (
        <Panel
          className={
            "absolute block right-0 z-10 mt-2 w-[280px] origin-top-right  rounded-md bg-white shadow-lg  "
          }
        >
          {option01}
          {option02}
        </Panel>
      )}
    </div>
  );
};

export default NavBarDropdown;
