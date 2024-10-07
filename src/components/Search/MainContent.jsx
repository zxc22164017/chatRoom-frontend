import React, { useEffect, useState } from "react";
import UserResult from "../Search/UserResult";
import { useSearchUsersMutation, useSearchPostMutation } from "../../store";
import Skeleton from "../Loading/Skeleton";
import Post from "../Posts/Post";
import Alert from "../Alert";
import { useSelector } from "react-redux";

const MainContent = ({}) => {
  const searchType = useSelector((state) => {
    return state.searchType;
  });
  const [searchUsers, userResults] = useSearchUsersMutation({
    fixedCacheKey: "searchUser",
  });
  const [searchPost, postResult] = useSearchPostMutation({
    fixedCacheKey: "searchPost",
  });
  const [page, setPage] = useState(0);
  function scrollEvent() {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    )
      setPage(page + 1);
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [page]);

  let content;

  if (userResults.isLoading || postResult.isLoading) {
    content = <Skeleton times={5} className={"w-full h-20"} />;
  }
  if (postResult.isSuccess && searchType.value === "posts") {
    content = postResult.data.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  }
  if (userResults.isSuccess && searchType.value === "users") {
    content = userResults.data.map((user) => {
      return <UserResult user={user} key={user._id} />;
    });
  }

  if (userResults.isError || postResult.isError) {
    content = (
      <div>
        <Alert error={"Internal server error"} />
      </div>
    );
  }

  return (
    <div className="bg-white ml-12 md:mx-96 min-w-sm flex flex-grow flex-col mt-14">
      {content}
    </div>
  );
};
export default MainContent;
