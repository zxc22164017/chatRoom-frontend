import { UserTemplate } from "../UserTemplate";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SideBarItem = ({ object, currentUser }) => {
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
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
  }, [object, currentUser]);
  const handleClick = () => {
    nav(`/chat/${object._id}`);
  };

  return <UserTemplate onClick={handleClick} name={name}></UserTemplate>;
};

export default SideBarItem;
