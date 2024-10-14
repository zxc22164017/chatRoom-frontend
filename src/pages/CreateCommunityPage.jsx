import React, { useEffect, useState } from "react";
import useGetLoginInfo from "../hooks/useGetLoginInfo";
import { useNavigate } from "react-router-dom";
import UploadImg from "../components/UploadImg";
import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import { useAddCommunityMutation, useUploadImgMutation } from "../store";
import { SearchUsers } from "../components/Search/SearchUsers";
const CreateCommunityPage = () => {
  const nav = useNavigate();
  const currentUser = useGetLoginInfo();
  const [addCommunity, result] = useAddCommunityMutation();
  const [uploadImg, uploadResult] = useUploadImgMutation();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rules: [],
  });
  const [rule, setRule] = useState({ title: "", content: "" });
  const [banner, setBanner] = useState(null);
  const [icon, setIcon] = useState(null);
  const [selectUsers, setSelectUsers] = useState([]);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.identity !== "admin") {
        nav("/");
      }
    }
  }, [currentUser]);
  const renderRules = formData.rules.map((rule, index) => {
    return (
      <div
        key={index}
        className="hover:cursor-pointer"
        onClick={() => {
          setFormData({
            ...formData,
            rules: [
              ...formData.rules.slice(0, index),
              ...formData.rules.slice(index + 1),
            ],
          });
        }}
      >
        <h1>title: {rule?.title}</h1>
        <p>{rule?.content}</p>
      </div>
    );
  });
  const handleSubmit = async () => {
    let iconKey;
    let bannerKey;
    if (icon) {
      iconKey = (await uploadImg({ file: icon })).data;
    }
    if (banner) {
      bannerKey = (await uploadImg({ file: banner })).data;
    }

    const newCom = await addCommunity({
      formData,
      icon: iconKey,
      banner: bannerKey,
      managers: selectUsers,
    }).unwrap();

    nav(`/c/${newCom.name}`);
  };

  return (
    <div className="bg-white ml-12 px-2 xl:mx-96 min-w-sm flex flex-grow flex-col mt-14 ">
      <div>
        <h1 className="font-bold">Set Banner</h1>
        {banner && (
          <img
            className="mb-2 w-full h-64 hover:cursor-pointer"
            src={URL.createObjectURL(banner)}
            onClick={() => {
              setBanner(null);
            }}
          />
        )}
        <div className="h-10 w-10">
          <UploadImg
            htmlFor={"banner"}
            handleImage={(e) => {
              setBanner(e.target.files[0]);
            }}
          />
        </div>
      </div>
      <div>
        <h1 className="font-bold">set icon</h1>
        {icon && (
          <img
            className="mb-2 h-36 w-36 ml-2 rounded-full hover:cursor-pointer"
            src={URL.createObjectURL(icon)}
            onClick={() => {
              setIcon(null);
            }}
          />
        )}
        <div className="h-10 w-10">
          <UploadImg
            htmlFor={"icon"}
            handleImage={(e) => {
              setIcon(e.target.files[0]);
            }}
          />
        </div>
      </div>
      <div className="w-full ">
        <h1 className="font-bold">name and discription</h1>
        <Input
          className="mb-4"
          text={"name"}
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
        />
        <Textarea
          className="w-full h-40"
          text={"description"}
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          noSubmit
        />
      </div>
      <div className="w-full mt-4">
        <h1 className="font-bold">managers:</h1>
        <div className="mx-16 my-2">
          <SearchUsers
            selectUser={selectUsers}
            setSelectUser={setSelectUsers}
          />
        </div>
        <h1 className="font-bold">rules</h1>
        <Input
          className="mb-4"
          text={"title"}
          value={rule.title}
          onChange={(e) => {
            setRule({ ...rule, title: e.target.value });
          }}
        />
        <Textarea
          onChange={(e) => {
            setRule({ ...rule, content: e.target.value });
          }}
          value={rule.content}
          className="w-full h-40 mb-4"
          text={"content"}
          noSubmit
        />
        <Button
          secondary
          className="w-40"
          onClick={() => {
            setFormData({ ...formData, rules: [...formData.rules, rule] });
            setRule({ title: "", content: "" });
          }}
        >
          Add rule
        </Button>
        {renderRules}
      </div>
      <div className="w-full flex items-center justify-center">
        <Button onClick={handleSubmit} primary className=" w-1/2 my-10">
          new community
        </Button>
      </div>
    </div>
  );
};

export default CreateCommunityPage;
