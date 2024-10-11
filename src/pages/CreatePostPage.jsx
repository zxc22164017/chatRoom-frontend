import UploadImg from "../components/UploadImg";
import CommunityAndRules from "../components/CreatePostPage/CommunityAndRules";

import Input from "../components/Input";
import Button from "../components/Button";
import { useAddPostMutation, useUploadImgMutation } from "../store";
import LoadingFancy from "../components/Loading/LoadingFancy";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const CreatePostPage = () => {
  const editableDiv = useRef();
  const nav = useNavigate();
  const [addPost, result] = useAddPostMutation();
  const [img, setImg] = useState(null);
  const [uploadImg, finalResult] = useUploadImgMutation();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    communityId: "",
  });
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    let key;
    if (img) {
      key = (await uploadImg({ file: img })).data;
    }
    addPost({ formData, image: key });
  };

  useEffect(() => {
    if (result.isSuccess) {
      nav(`/post/${result.data._id}`);
    }
  }, [result]);
  const handleImage = (e) => {
    setImg(e.target.files[0]);
  };
  return (
    <div className=" bg-white flex flex-col items-center justify-between flex-grow mt-14  ">
      {result.isLoading || finalResult.isLoading ? (
        <LoadingFancy />
      ) : (
        <form onSubmit={handleSubmitPost} className=" w-full md:w-[720px] ">
          {result.isError &&
            (result.error?.data ? (
              <Alert error={result.error.data} />
            ) : (
              <Alert error={"something went wrong"} />
            ))}
          <h1 className="text-2xl font-semibold my-4">Create post</h1>
          <CommunityAndRules
            editable={true}
            setFormData={setFormData}
            formData={formData}
          />
          <Input
            text={"Title"}
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />
          <textarea
            ref={editableDiv}
            onChange={(e) => {
              setFormData({ ...formData, content: e.target.value });
            }}
            value={formData.content}
            placeholder="Body"
            className="block p-2.5 min-h-[600px]  mt-2 w-full text-sm md:min-h-[380px] text-gray-900  rounded-lg outline-none"
            id=""
          ></textarea>
          {img && (
            <img
              className="mb-2 hover:cursor-pointer"
              src={URL.createObjectURL(img)}
              onClick={() => {
                setImg(null);
              }}
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

export default CreatePostPage;
