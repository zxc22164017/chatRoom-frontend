import React, { useRef, useState, useEffect } from "react";
import Panel from "../Panel";
import { IoMdMore } from "react-icons/io";
import Button from "../Button";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import NavBarDropdownOption from "../NavBar/NavBarDropdownOption";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ className, author, postId }) => {
  const currentUser = useGetLoginInfo();
  const nav = useNavigate();
  const divElement = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
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

  let content;
  if (currentUser._id === author._id) {
    content = (
      <>
        <NavBarDropdownOption
          onChange={() => {
            nav(`/post/edit/${postId}`);
          }}
        >
          Edit Post
        </NavBarDropdownOption>
        <NavBarDropdownOption className={"hover:text-red-500 hover:bg-red-100"}>
          Delete Post
        </NavBarDropdownOption>
      </>
    );
  } else {
    content = <NavBarDropdownOption>report</NavBarDropdownOption>;
  }

  return (
    <div ref={divElement} className={`relative mr-4 ${className}`}>
      <Button
        onClick={handleOpen}
        rounded
        className="h-6 w-6  p-0 border-none active:ring-0 mr-4 hover:text-blue-400 transition-all duration-100"
      >
        <IoMdMore className="w-full h-full" />
      </Button>
      {isOpen && (
        <Panel
          className={
            "absolute block right-0 z-10 mt-2 w-32 origin-top-right  rounded-md bg-white shadow-lg  "
          }
        >
          {content}
        </Panel>
      )}
    </div>
  );
};

export default Dropdown;
