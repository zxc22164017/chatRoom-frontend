import React, { useEffect, useState } from "react";
import useGetLoginInfo from "../hooks/useGetLoginInfo";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../components/Input";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import cloneDeep from "lodash.clonedeep";
import {
  usePatchCommunityMutation,
  useUploadImgMutation,
  useGetSingleCommunityQuery,
} from "../store";
import ThumbnailWithPreview from "../components/Thumbnails/ThumbnailWithPreview";
const EditCommunityPage = () => {
  const { communityName } = useParams();
  const nav = useNavigate();
  const currentUser = useGetLoginInfo();
  const [patchCommunity, patchResult] = usePatchCommunityMutation();
  const [uploadImg, uploadResult] = useUploadImgMutation();
  const { data } = useGetSingleCommunityQuery(communityName);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    rules: [],
  });
  const [rule, setRule] = useState({ title: "", content: "" });
  const [banner, setBanner] = useState(null);
  const [icon, setIcon] = useState(null);
  useEffect(() => {
    if (currentUser && data) {
      const managers = data?.managers;
      let c = 0;
      if (currentUser.identity === "admin") {
        c += 1;
      } else if (managers) {
        managers.forEach((user) => {
          if (user._id === currentUser._id) c += 1;
        });
      }

      if (c === 0) {
        nav("/");
      }
    }
    if (data) {
      setFormData({
        name: data.name,
        description: data.description,
        rules: cloneDeep(data.rules),
      });
    }
  }, [currentUser, data]);
  const renderRules = formData?.rules?.map((rule, index) => {
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

    await patchCommunity({
      formData: formData,
      icon: iconKey,
      banner: bannerKey,
      communityId: data._id,
    }).unwrap();

    nav(`/c/${formData.name}`);
  };

  return (
    <div className="bg-white ml-12 md:mx-96 min-w-sm flex flex-grow flex-col mt-14 ">
      <ThumbnailWithPreview
        previewImg={banner}
        setPreviewImg={setBanner}
        img={data?.banner}
        htmlFor={"banner"}
        className={"h-64 rounded-none"}
      />
      <ThumbnailWithPreview
        previewImg={icon}
        setPreviewImg={setIcon}
        img={data?.icon}
        htmlFor={"icon"}
        className={"w-36 h-36 mt-2 rounded-full"}
      />
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
        <h1>rules</h1>
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
      <Button onClick={handleSubmit} primary className="w-1/2 my-10">
        Save
      </Button>
    </div>
  );
};

export default EditCommunityPage;
