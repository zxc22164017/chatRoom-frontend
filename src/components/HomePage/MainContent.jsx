import React, { useEffect, useState } from "react";
import UserResult from "../Search/UserResult";
import { useSearchUsersMutation, useGetPostsQuery } from "../../store";
import Skeleton from "../Loading/Skeleton";
import Post from "../Posts/Post";
import Alert from "../Alert";

export function MainContent({}) {
  const [searchUsers, results] = useSearchUsersMutation({
    fixedCacheKey: "search",
  });
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useGetPostsQuery(page);
  function scrollEvent() {
    if (
      window.scrollY + window.innerHeight ===
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
  if (data) {
    content = data.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  }

  if (results.isLoading || isLoading) {
    content = <Skeleton times={5} className={"w-full h-20"} />;
  }
  if (results.isSuccess) {
    content = results.data.map((user) => {
      return <UserResult user={user} key={user._id} />;
    });
  }
  if (results.isError || error) {
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
}
