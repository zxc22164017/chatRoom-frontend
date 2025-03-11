import Comment from "./Comment";
import { useGetCommentQuery } from "../../store";
import { useParams } from "react-router-dom";
import LoadingFancy from "../Loading/LoadingFancy";
import { useEffect, useState } from "react";
import Skeleton from "../Loading/Skeleton";
import Alert from "../Alert";
const CommentSection = () => {
  const [page, setPage] = useState(0);
  const { _id } = useParams();
  const { data, error, isLoading, isFetching } = useGetCommentQuery({
    postId: _id,
    page,
  });
  const [noMore, setNoMore] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  function scrollEvent() {
    if (
      window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight &&
      !noMore &&
      !isLoading &&
      !isFetching
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
  }, [page, isLoading, isFetching]);
  useEffect(() => {
    if (error) {
      if (error?.status === 404) {
        setNoMore(true);
        setErrorMsg("no more data");
      } else {
        setErrorMsg("error");
      }
    }
  }, [error]);

  let content;
  if (isLoading) {
    content = (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingFancy />
      </div>
    );
  } else if (data) {
    content = data.map((item, index) => {
      return (
        <Comment
          index={index}
          key={item._id}
          setPage={setPage}
          comment={item}
          setNoMore={setNoMore}
        />
      );
    });
  }

  return (
    <div className=" mb-4">
      {content}
      {isFetching && <Skeleton times={1} className={"w-full h-20"} />}
      {errorMsg && (
        <div className="h-8">
          <Alert error={errorMsg} />
        </div>
      )}
    </div>
  );
};

export default CommentSection;
