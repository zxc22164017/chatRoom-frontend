import React, { useEffect, useState } from "react";
import LoadingFancy from "../components/Loading/LoadingFancy";
import Alert from "../components/Alert";
import CommunityAndRules from "../components/CreatePostPage/CommunityAndRules";
import Input from "../components/Input";
import UploadImg from "../components/UploadImg";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import Thumbnail from "../components/Thumbnails/Thumbnail";
import {
  useGetSinglePostQuery,
  useUploadImgMutation,
  usePatchPostMutation,
} from "../store";

const EditPostPage = () => {
  const nav = useNavigate();
  const { _id } = useParams();
  const { data, error, isLoading } = useGetSinglePostQuery(_id);
  const [patchPost, patchResult] = usePatchPostMutation();
  const [uploadImg, imgResult] = useUploadImgMutation();
  const [img, setImg] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    communityId: "",
  });
  const community = data?.community;
  const handleImage = (e) => {
    setImg(e.target.files[0]);
  };
  const handleSubmitPost = async (e) => {
    e.preventDefault();

    const key = (await uploadImg({ file: img })).data;
    patchPost({ formData, postId: _id, image: key });
  };
  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title,
        content: data.content,
        communityId: data.community._id,
      });
    }
  }, [data]);
  useEffect(() => {
    if (patchResult.isSuccess) {
      nav(`/post/${_id}`);
    }
  }, [patchResult]);
  return (
    <div className=" bg-white flex flex-col items-center justify-between flex-grow mt-14  ">
      {isLoading || imgResult.isLoading || patchResult.isLoading ? (
        <LoadingFancy />
      ) : (
        <form onSubmit={handleSubmitPost} className=" w-full md:w-[720px] ">
          {patchResult.isError &&
            (patchResult.error?.data ? (
              <Alert error={patchResult.error.data} />
            ) : (
              <Alert error={"something went wrong"} />
            ))}
          <h1 className="text-2xl font-semibold my-4">Edit post</h1>
          <CommunityAndRules community={community} />
          <Input
            text={"Title"}
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <textarea
            onChange={(e) => {
              setFormData({ ...formData, content: e.target.value });
            }}
            value={formData.content}
            placeholder="Body"
            className="block p-2.5 min-h-[600px]  mt-2 w-full text-sm md:min-h-[380px] text-gray-900  rounded-lg outline-none"
            id=""
          ></textarea>
          {img ? (
            <img
              className="mb-2 hover:cursor-pointer"
              src={URL.createObjectURL(img)}
              onClick={() => {
                setImg(null);
              }}
            />
          ) : (
            <Thumbnail
              className={"rounded-none mb-2 hover:cursor-default"}
              image={data.image}
            />
          )}
          <div className="flex items-center justify-between ">
            <UploadImg handleImage={handleImage} />
            <Button primary rounded className="h-10 w-20 mr-4">
              <h1>Post</h1>
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPostPage;
