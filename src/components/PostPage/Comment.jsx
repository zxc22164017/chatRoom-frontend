import React, { useState } from "react";
import UserTemplate from "../UserTemplate";
import { FaHeart } from "react-icons/fa6";
import Button from "../Button";
import useConvertToDate from "../../hooks/useConvertToDate";
import { useNavigate, useParams } from "react-router-dom";
import { useLikeCommentMutation } from "../../store";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import Thumbnail from "../Thumbnails/Thumbnail";
import DropdownComment from "./DropdownComment";
import EditComment from "./EditComment";
const Comment = ({ comment, setPage, index, setNoMore }) => {
  const nav = useNavigate();
  const currentUser = useGetLoginInfo();
  const { _id } = useParams();
  const { author } = comment;
  const time = useConvertToDate("time", comment.postTime);
  const [liked, setLiked] = useState(comment.likes.includes(currentUser._id));
  const [likeComment, result] = useLikeCommentMutation();
  const [edit, setEdit] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
    setPage(0);
    setNoMore(false);

    likeComment(comment._id);
  };

  return (
    <div className="p-2 border-b-2 relative group">
      <div className="flex items-center justify-between">
        <UserTemplate
          onClick={() => {
            nav(`/profile/${author._id}`);
          }}
          image={author.thumbnail}
          thumbnailClassname={"h-8 mx-0 my-4 w-8 p-0 justify-center"}
          className={"m-0 p-0 h-9 hover:bg-transparent "}
          firstLineClassname={"text-sm"}
          secondLineClassname={"text-sm "}
          name={author.username}
          info={time}
        />
        <DropdownComment
          setEdit={setEdit}
          author={author}
          className={"hidden  group-hover:block "}
        />
      </div>
      <p className="absolute top-1 text-xs text-gray-400">{index + 1}</p>
      {edit ? (
        <EditComment setEdit={setEdit} comment={comment} />
      ) : (
        <>
          <p className="ml-4 ">{comment.content}</p>
          {comment.image && (
            <Thumbnail
              className={"rounded-none max-w-md"}
              image={comment.image}
            />
          )}
          <div className="absolute right-6 bottom-0">
            <p className="absolute top-1">{comment.likes.length}</p>
            <Button
              rounded
              onClick={handleLike}
              className=" border-none active:ring-0 active:scale-90"
            >
              <FaHeart
                className={`text-2xl ${
                  liked ? "text-red-500" : "text-gray-400"
                }`}
              />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
