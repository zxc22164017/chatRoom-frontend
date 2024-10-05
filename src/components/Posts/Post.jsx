import Footer from "../PostPage/Footer";
import React from "react";
import { Thumbnail } from "../Thumbnails/Thumbnail";

import useConvertToDate from "../../hooks/useConvertToDate";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const nav = useNavigate();
  const { community } = post;
  const time = useConvertToDate("time", post.postTime);

  return (
    <div
      className="w-full border-b-2 rounded p-2 hover:bg-slate-200 hover:cursor-pointer"
      onClick={() => {
        nav(`/post/${post._id}`);
      }}
    >
      <div className="flex mt-1 text-gray-500">
        <Thumbnail className={"w-6 h-6"} />
        <p className="text-sm mx-2 ">
          {community.name} • {time}
        </p>
      </div>
      <h1 className="text-2xl">{post.title}</h1>
      <p className="truncate overflow-hidden text-nowrap mt-2 mb-1 text-gray-600">
        {post.content}
      </p>
      <div className="">
        {post.image && (
          <img className="bg-slate-600 w-full mx-auto h-[390px] rounded-md"></img>
        )}
        <Footer likes={post.likes.length} comments={post.comments.length} />
      </div>
    </div>
  );
}

export default Post;
