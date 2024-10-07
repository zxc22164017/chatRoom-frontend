import React, { useState } from "react";
import { FaHeart } from "react-icons/fa6";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import Button from "../Button";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import { useLikePostMutation } from "../../store";
import { useParams } from "react-router-dom";

const Footer = ({
  likes,
  comments,
  className,
  iconClassName,
  textClassName,
}) => {
  const { _id } = useParams();
  const currentUser = useGetLoginInfo();
  const [likePost, result] = useLikePostMutation();

  const [liked, setLiked] = useState(likes.includes(currentUser._id));
  const handleLike = () => {
    likePost(_id);
    setLiked(!liked);
  };

  return (
    <div className={`flex items-center justify-between mt-1 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="flex items-center ">
          <FaHeart className={`text-red-500 ${iconClassName}`} />
          <p className={`text-xs ml-1 ${textClassName}`}>{likes.length}</p>
        </div>
        <div className="flex items-center ">
          <BiSolidMessageAltDetail
            className={`text-sky-500 ${iconClassName}`}
          />
          <p className={`text-xs ml-1 ${textClassName}`}>{comments}</p>
        </div>
      </div>

      <div>
        <Button
          onClick={handleLike}
          rounded
          className=" border-none active:ring-0 active:scale-90"
        >
          <FaHeart
            className={`text-2xl ${liked ? "text-red-500" : "text-gray-400"}`}
          />
        </Button>
      </div>
    </div>
  );
};
export default Footer;
