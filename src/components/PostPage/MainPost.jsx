import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSinglePostQuery,
  useAddCommentMutation,
  useUploadImgMutation,
} from "../../store";
import LoadingFancy from "../Loading/LoadingFancy";
import Header from "./Header";
import UserTemplate from "../UserTemplate";
import useConvertToDate from "../../hooks/useConvertToDate";
import Footer from "./Footer";
import CommentSection from "./CommentSection";
import Textarea from "../Textarea";
import Thumbnail from "../Thumbnails/Thumbnail";
import Dropdown from "./Dropdown";

const MainPost = () => {
  const nav = useNavigate();
  const { _id } = useParams();
  const { data, error, isLoading } = useGetSinglePostQuery(_id);
  const [addComment, result] = useAddCommentMutation();
  const [uploadImg, finalResult] = useUploadImgMutation();
  const convertToDate = useConvertToDate;
  const [formData, setformData] = useState("");
  const [img, setImg] = useState(null);

  let content;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const key = (await uploadImg({ file: img })).data;
    addComment({
      postId: _id,
      formData: formData,
      image: key,
    });
    window.location.reload();
  };

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
          <div className="flex justify-between group">
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
            <Dropdown author={author} post={data} />
          </div>
          <div className="mt-4 whitespace-pre text-wrap">
            <p>{data.content}</p>
            {data.image && (
              <Thumbnail
                className={"max-w-max max-h-max rounded-none"}
                image={data.image}
              />
            )}
          </div>
          <Footer
            className="mt-6"
            iconClassName="text-2xl"
            textClassName="text-sm"
            enableButton
            likes={data.likes}
            comments={data.comments.length}
          />
          <CommentSection />
          <form className=" sticky bottom-1" onSubmit={handleSubmit}>
            <Textarea
              htmlFor={"comment"}
              value={formData}
              onChange={(e) => {
                setformData(e.target.value);
              }}
              handleImage={(e) => {
                setImg(e.target.files[0]);
              }}
              resetImage={() => {
                setImg(null);
              }}
              img={img}
              text={"Comment"}
            />
          </form>
        </div>
      </>
    );
  }

  return (
    <div className="bg-white ml-12 md:mx-80 p-4 min-w-sm flex flex-grow flex-col mt-14">
      {content}
    </div>
  );
};

export default MainPost;
