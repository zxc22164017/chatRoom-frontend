import Thumbnail from "../Thumbnails/Thumbnail";
import Panel from "../Panel";
import { useState, useEffect, useRef } from "react";
import NavBarDropdownOption from "./NavBarDropdownOption";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { useGetUserQuery, useLogoutMutation } from "../../store";
import { FaCog } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const NavBarDropdown = () => {
  const nav = useNavigate();
  const divElement = useRef();
  const [logout] = useLogoutMutation();
  const userInfo = useGetUserQuery().data;

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileNav = () => {
    setIsOpen(false);
    nav(`/profile/${userInfo._id}`);
  };
  const handleSettingNav = () => {
    setIsOpen(false);
    nav("/setting");
  };
  const handleLogOut = () => {
    logout(userInfo._id);
    setIsOpen(false);
    localStorage.removeItem("jwt");
    setTimeout(() => {
      location.reload();
    }, 200);
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
    <NavBarDropdownOption onChange={handleSettingNav}>
      <Thumbnail className={"h-8 w-8"}>
        <FaCog />
      </Thumbnail>
      <h1 className="ml-2  group-hover:text-sky-500">Setting</h1>
    </NavBarDropdownOption>
  );

  const option03 = (
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
        className={
          "w-10 h-10 hover:cursor-pointer hover:scale-105 active:scale-90 transition-all duration-150"
        }
        onClick={handleOpen}
        image={userInfo?.thumbnail}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
          >
            <Panel
              className={
                "absolute block right-0 z-10 mt-2 w-[280px] origin-top-right  rounded-md bg-white shadow-lg  "
              }
            >
              {option01}
              {option02}
              {option03}
            </Panel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavBarDropdown;
