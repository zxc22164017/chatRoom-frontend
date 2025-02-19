import { useEffect, useState } from "react";
import { changeSearchType, useGetPostsQuery } from "../../store";
import Skeleton from "../Loading/Skeleton";
import Post from "../Posts/Post";
import Alert from "../Alert";
import { useDispatch } from "react-redux";

const MainContent = () => {
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const [noMore, setNoMore] = useState(false);
  const { data, error, isLoading, isFetching } = useGetPostsQuery(page);
  function scrollEvent() {
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight &&
      !noMore
    ) {
      setPage(page + 1);
    }
  }
  useEffect(() => {
    dispatch(changeSearchType({ label: "posts", value: "posts" }));
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [page]);
  useEffect(() => {
    if (error?.status === 404) {
      setNoMore(true);
    }
  }, [error]);

  let content;
  if (data) {
    content = data.map((post) => {
      return <Post key={post._id} post={post} />;
    });
  }

  if (isLoading) {
    content = <Skeleton times={5} className={"w-full h-20"} />;
  }

  if (error) {
    if (error.status !== 404) {
      content = (
        <div>
          <Alert error={"Internal server error"} />
        </div>
      );
    }
  }

  return (
    <div className="bg-white shadow ml-14 xl:mx-96 min-w-sm flex flex-grow flex-col mt-14">
      {content}
      {isFetching && <Skeleton times={1} className={"w-full h-20"} />}
      {noMore && (
        <div className="flex justify-center items-center">
          <p className="">no more data</p>
        </div>
      )}
    </div>
  );
};
export default MainContent;
