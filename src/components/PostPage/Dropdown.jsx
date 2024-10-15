import React, { useRef, useState, useEffect } from "react";
import Panel from "../Panel";
import { IoMdMore } from "react-icons/io";
import Button from "../Button";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import NavBarDropdownOption from "../NavBar/NavBarDropdownOption";
import { useNavigate } from "react-router-dom";
import DoubleConfirmModal from "../../models/DoubleConfirmModal";
import { useDeletePostMutation } from "../../store";

const Dropdown = ({ className, author, post }) => {
  const currentUser = useGetLoginInfo();
  const nav = useNavigate();
  const divElement = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [deletePost, postResult] = useDeletePostMutation();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleDelete = () => {
    deletePost(post);
  };
  useEffect(() => {
    if (postResult.isSuccess) {
      nav("/");
    }
  }, [postResult]);
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
            nav(`/post/edit/${post._id}`);
          }}
        >
          Edit Post
        </NavBarDropdownOption>
        <NavBarDropdownOption
          onChange={() => {
            setShow(true);
          }}
          className={"hover:text-red-500 hover:bg-red-100"}
        >
          Delete Post
        </NavBarDropdownOption>
      </>
    );
  } else {
    content = <NavBarDropdownOption>report</NavBarDropdownOption>;
  }

  return (
    <div ref={divElement} className={`relative mr-4 ${className}`}>
      {show && (
        <DoubleConfirmModal
          onChange={() => {
            setShow(false);
          }}
          isLoading={postResult.isLoading}
          handleDelete={handleDelete}
        />
      )}
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
