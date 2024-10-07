import React, { useState } from "react";
import UserTemplate from "../UserTemplate";
import { FaHeart } from "react-icons/fa6";
import Button from "../Button";
import useConvertToDate from "../../hooks/useConvertToDate";
import { useNavigate, useParams } from "react-router-dom";
import { useLikeCommentMutation } from "../../store/apis/commentApi";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import Thumbnail from "../Thumbnails/Thumbnail";
const Comment = ({ comment, setPage, index }) => {
  const nav = useNavigate();
  const currentUser = useGetLoginInfo();
  const { _id } = useParams();
  const { author } = comment;
  const time = useConvertToDate("time", comment.postTime);
  const [liked, setLiked] = useState(comment.likes.includes(currentUser._id));
  const [likeComment, result] = useLikeCommentMutation();
  const handleLike = () => {
    setLiked(!liked);
    setPage(0);
    scrollTo(500, 500);
    likeComment(comment._id);
  };

  return (
    <div className="p-2 border-b-2 relative">
      <UserTemplate
        onClick={() => {
          nav(`/profile/${author._id}`);
        }}
        image={author.thumbnail}
        thumbnailClassname={"h-8 mx-0 my-4 w-8 p-0 justify-center"}
        className={"m-0 p-0 h-9 hover:bg-transparent"}
        firstLineClassname={"text-sm"}
        secondLineClassname={"text-sm "}
        name={author.username}
        info={time}
      />
      <p className="absolute top-1 text-xs text-gray-400">{index + 1}</p>
      <p className="ml-4 ">{comment.content}</p>
      {comment.image && (
        <Thumbnail className={"rounded-none max-w-md"} image={comment.image} />
      )}
      <div className="absolute right-6 bottom-0">
        <p className="absolute top-1">{comment.likes.length}</p>
        <Button
          rounded
          onClick={handleLike}
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

export default Comment;
