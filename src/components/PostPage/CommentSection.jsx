import Comment from "./Comment";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useGetCommentQuery } from "../../store";
import { useParams } from "react-router-dom";
import LoadingFancy from "../Loading/LoadingFancy";
import { useEffect, useState } from "react";
const CommentSection = () => {
  const [page, setPage] = useState(0);
  const { _id } = useParams();
  const { data, error, isLoading } = useGetCommentQuery({ postId: _id, page });

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
        />
      );
    });
  }

  return <div className=" mb-2">{content}</div>;
};

export default CommentSection;
