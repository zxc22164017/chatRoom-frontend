import React from "react";
import { FaHeart } from "react-icons/fa6";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import Button from "../Button";

const Footer = ({
  likes,
  comments,
  className,
  iconClassName,
  textClassName,
}) => {
  return (
    <div className={`flex items-center justify-between mt-1 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center ">
          <FaHeart className={`text-red-500 ${iconClassName}`} />
          <p className={`text-xs ml-1 ${textClassName}`}>{likes}</p>
        </div>
        <div className="flex items-center ">
          <BiSolidMessageAltDetail
            className={`text-sky-500 ${iconClassName}`}
          />
          <p className={`text-xs ml-1 ${textClassName}`}>{comments}</p>
        </div>
      </div>
      <div>
        <Button rounded className=" border-none active:ring-0 active:scale-90">
          <FaHeart className="text-2xl text-gray-400" />
        </Button>
      </div>
    </div>
  );
};
export default Footer;
