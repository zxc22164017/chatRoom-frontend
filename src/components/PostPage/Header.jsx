import React from "react";
import Button from "../Button";
import Thumbnail from "../Thumbnails/Thumbnail";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ community }) => {
  const nav = useNavigate();
  return (
    <div className="flex items-center  p-2 border-b-2">
      <Button
        onClick={() => {
          nav(-1);
        }}
        rounded
        className="h-8 p-1 md:-ml-4 w-8 bg-gray-200 border-none"
      >
        <FaArrowLeft className="h-full w-full" />
      </Button>
      <div
        onClick={() => {
          nav(`/c/${community.name}`);
        }}
        className="flex items-center ml-2 gap-2 hover:cursor-pointer"
      >
        <Thumbnail className={"w-10 h-10"} image={community.icon} />
        <h2>{community.name}</h2>
      </div>
    </div>
  );
};

export default Header;
