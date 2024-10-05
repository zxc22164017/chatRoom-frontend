import { CommunityAndRules } from "../components/CreatePostPage/CommunityAndRules";

import Input from "../components/Input";
import Button from "../components/Button";
import { useAddPostMutation } from "../store";
import { CiImageOn } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

function CreatePostPage() {
  const nav = useNavigate();
  const [addPost, result] = useAddPostMutation();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    communityId: "",
  });
  const handleSubmitPost = (e) => {
    e.preventDefault();

    addPost(formData);
  };

  useEffect(() => {
    if (result.isSuccess) {
      nav("/");
    }
  }, [result]);

  return (
    <div className=" bg-white flex flex-col items-center justify-between flex-grow mt-14  ">
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
          onChange={(e) => {
            setFormData({ ...formData, content: e.target.value });
          }}
          value={formData.content}
          placeholder="Body"
          className="block p-2.5 min-h-[600px]  mt-2 w-full text-sm md:min-h-[380px] text-gray-900  rounded-lg outline-none"
          id=""
        ></textarea>
        <div className="flex items-center justify-between ">
          <Button className="h-14 w-14 border-none active:ring-0">
            <CiImageOn className="w-full h-full text-gray-500" />
          </Button>
          <Button primary rounded className="h-10 w-20 mr-4">
            <h1>Post</h1>
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreatePostPage;
