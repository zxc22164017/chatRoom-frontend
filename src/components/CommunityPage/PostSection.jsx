import React, { useEffect, useState } from "react";
import {
  useGetCommunityPostsQuery,
  useGetMoreCommunityPostsMutation,
} from "../../store";
import Skeleton from "../Loading/Skeleton";
import Post from "../Posts/Post";

const PostSection = ({ communityId }) => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetCommunityPostsQuery(communityId);
  const [getMorePosts, result] = useGetMoreCommunityPostsMutation();
  function scrollEvent() {
    if (
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      if (!result.isLoading) {
        setPage(page + 1);

        if (page !== 0) {
          getMorePosts({ communityId, page });
          if (result.isSuccess && result.data.length !== 0) {
            scrollTo(0, 900);
          }
        }
      }
    }
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
  if (isLoading || !communityId) {
    content = <Skeleton times={5} />;
  } else if (data) {
    content = data.map((item) => {
      return <Post key={item._id} post={item} />;
    });
  } else if (error) {
    console.log(error);
  }

  return <div>{content}</div>;
};

export default PostSection;
