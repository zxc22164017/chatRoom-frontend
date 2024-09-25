import React from "react";
import { UserTemplate } from "../UserTemplate";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const UserResult = ({ user }) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/profile/${user._id}`);
  };
  return (
    <div className="border-b-2  ">
      <UserTemplate
        className={"mx-0 "}
        name={user.username}
        info={user.friends.length}
        onClick={handleClick}
      ></UserTemplate>
    </div>
  );
};

export default UserResult;
