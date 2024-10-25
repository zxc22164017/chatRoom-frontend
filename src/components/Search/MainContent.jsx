import React, { useEffect, useState } from "react";
import UserResult from "../Search/UserResult";
import {
  useSearchUsersQuery,
  useSearchPostQuery,
  changeSearchPage,
  changeNoMore,
} from "../../store";
import Skeleton from "../Loading/Skeleton";
import Post from "../Posts/Post";
import Alert from "../Alert";
import { useSelector, useDispatch } from "react-redux";

const MainContent = ({}) => {
  const { searchType, input, skipSearch, page, noMore } = useSelector(
    (state) => {
      return state.search;
    }
  );
  const dispatch = useDispatch();
  const userResult = useSearchUsersQuery(
    { search: input, page },
    { skip: searchType.value !== "users" || skipSearch }
  );
  const postResult = useSearchPostQuery(
    {
      search: input,
      page,
    },
    { skip: searchType.value !== "posts" || skipSearch }
  );

  function scrollEvent() {
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight &&
      !noMore
    )
      dispatch(changeSearchPage(page + 1));
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
  useEffect(() => {
    if (userResult.error?.status === 404 || postResult.error?.status === 404) {
      dispatch(changeNoMore(true));
    }
  }, [userResult, postResult]);

  let content;

  if (userResult.isLoading || postResult.isLoading) {
    content = <Skeleton times={5} className={"w-full h-20"} />;
  }
  if (postResult?.data && searchType.value === "posts") {
    content = postResult.data.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  }
  if (userResult?.data && searchType.value === "users") {
    content = userResult.data.map((user) => {
      return <UserResult user={user} key={user._id} />;
    });
  }

  if (userResult.isError || postResult.isError) {
    if (userResult.error?.status === 404 || postResult.error?.status === 404) {
      if (page === 0) {
        content = (
          <div className="w-full h-full flex items-center justify-center p-10">
            <h1 className="text-4xl font-extrabold  text-slate-500">
              No Search Result
            </h1>
          </div>
        );
      }
    } else {
      content = (
        <div className="flex items-center justify-center">
          <Alert error={"Internal server error"} />
        </div>
      );
    }
  }

  return (
    <div className="bg-white ml-12 xl:mx-96 min-w-sm flex flex-grow flex-col mt-14">
      {content}
      {userResult.isFetching ||
        (postResult.isFetching && (
          <Skeleton times={1} className={"w-full h-20"} />
        ))}
    </div>
  );
};
export default MainContent;
