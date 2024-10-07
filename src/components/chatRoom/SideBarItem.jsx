import UserTemplate from "../UserTemplate";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Thumbnail from "../Thumbnails/Thumbnail";

const SideBarItem = ({ object, currentUser }) => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const filteredUsers = object.users.filter((user) => {
      if (user._id !== currentUser._id) {
        return user;
      }
    });
    if (object?.name) {
      setName(object.name);
    } else {
      setName(filteredUsers[0].username);
    }
    if (object?.lastMessage) {
      setInfo(object.lastMessage.message);
    }
    if (object?.thumbnail) {
      setImg(object.thumbnail);
    } else {
      setImg(filteredUsers[0].thumbnail);
    }
  }, [object, currentUser]);
  const handleClick = () => {
    nav(`/chat/${object._id}`);
  };
  return (
    <>
      <UserTemplate
        className={"hidden md:flex p-2"}
        onClick={handleClick}
        name={name}
        info={info}
        image={img}
      ></UserTemplate>
      <Thumbnail
        image={img}
        className={"h-10 w-10 m-2 block md:hidden"}
        onClick={handleClick}
      />
    </>
  );
};

export default SideBarItem;
