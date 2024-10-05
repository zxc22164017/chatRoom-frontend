import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "../../store";
import { LoadingFancy } from "../Loading/LoadingFancy";
import Header from "./Header";
import { UserTemplate } from "../UserTemplate";
import useConvertToDate from "../../hooks/useConvertToDate";
import Footer from "./Footer";
import CommentSection from "./CommentSection";
import Textarea from "../Textarea";

function MainPost() {
  const nav = useNavigate();
  const { _id } = useParams();
  const { data, error, isLoading } = useGetSinglePostQuery(_id);
  const convertToDate = useConvertToDate;
  let content;
  console.log(data);

  if (isLoading) {
    content = (
      <div className="flex justify-center items-center">
        <LoadingFancy />
      </div>
    );
  } else if (data) {
    const { author } = data;
    const time = convertToDate("time", data.postTime);
    content = (
      <>
        <Header community={data.community} />
        <div className="flex flex-col px-8">
          <h1 className="text-4xl my-4">{data.title}</h1>
          <div className="flex">
            <UserTemplate
              onClick={() => {
                nav(`/profile/${author._id}`);
              }}
              image={author.thumbnail}
              thumbnailClassname={"h-8 m-0 w-8 p-0 m-0"}
              className={"m-0 p-0 h-9 hover:bg-transparent"}
              firstLineClassname={"text-sm"}
              secondLineClassname={"text-xs"}
              name={author.username}
              info={time}
            />
          </div>
          <div className="mt-4 whitespace-pre text-wrap">
            <p>{data.content}</p>
          </div>
          <Footer
            className="mt-6"
            iconClassName="text-2xl"
            textClassName="text-sm"
            likes={data.likes.length}
            comments={data.comments.length}
          />
          <CommentSection />
          <Textarea />
        </div>
      </>
    );
  }

  return (
    <div className="bg-white ml-12 md:mx-80 p-4 min-w-sm flex flex-grow flex-col mt-14">
      {content}
    </div>
  );
}

export default MainPost;
