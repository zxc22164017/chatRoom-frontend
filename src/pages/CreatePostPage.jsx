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

    if (img) {
      const data = await addPost(formData).unwrap();
      uploadImg({ file: img, type: "post", id: data._id });
    } else {
      addPost(formData);
    }
  };

  useEffect(() => {
    if (img) {
      if (finalResult.isSuccess) {
        nav("/");
      }
    } else {
      if (result.isSuccess) {
        nav("/");
      }
    }
  }, [finalResult, result]);
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
          <CommunityAndRules setFormData={setFormData} formData={formData} />
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
          {img && <img className="mb-2" src={URL.createObjectURL(img)} />}
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
