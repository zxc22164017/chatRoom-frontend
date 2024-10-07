import React, { useState, useEffect } from "react";
import { useGetUserPostsQuery } from "../../store";
import LoadingFancy from "../Loading/LoadingFancy";
import Post from "../Posts/Post";

const PersonalPostList = ({ userId }) => {
  const [page, setPage] = useState(0);
  const { data, isLoading, error, isSuccess } = useGetUserPostsQuery({
    userId,
    page,
  });
  function scrollEvent() {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    )
      setPage(page + 1);
  }
  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [page]);
  let content;
  if (isLoading) {
    content = (
      <div className="flex flex-col flex-grow items-center justify-center">
        <LoadingFancy />
      </div>
    );
  } else if (isSuccess) {
    if (data.length === 0) {
      content = (
        <div className="flex p-4 h-40 justify-center items-center">
          <h1 className="text-3xl  text-gray-400 font-extrabold">
            Haven't post anything yet
          </h1>
        </div>
      );
    } else {
      content = data.map((item) => {
        return <Post key={item._id} post={item} />;
      });
    }
  } else if (error) {
    console.log(error);
  }
  return (
    <div className="bg-white mt-8 rounded flex flex-col flex-grow   ">
      {content}
    </div>
  );
};

export default PersonalPostList;
