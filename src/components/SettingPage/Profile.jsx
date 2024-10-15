import ThumbnailWithPreview from "../Thumbnails/ThumbnailWithPreview";
import React, { useState, useEffect } from "react";

import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import Thumbnail from "../Thumbnails/Thumbnail";
import Button from "../Button";
import useFilterObject from "../../hooks/useFilterObject";
import { useUploadImgMutation, usePatchUserMutation } from "../../store";
import useConvertToDate from "../../hooks/useConvertToDate";
import SettingProfileModel from "../../models/SettingProfileModel";
import Textarea from "../Textarea";
import Input from "../Input";

const Profile = () => {
  const currentUser = useGetLoginInfo();
  const dateConvert = useConvertToDate;
  const filterObj = useFilterObject;
  const [formData, setFormData] = useState({});
  const [gender, setGender] = useState();
  const [patchUser, result] = usePatchUserMutation();
  const [uploadImg, patchResult] = useUploadImgMutation();
  const [thumbnail, setThumbnail] = useState();
  const [coverPhoto, setCoverPhoto] = useState();
  const [error, setError] = useState();
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        password: "",
        patchPassword: "",
        email: currentUser.email,
        birthday: currentUser.birthday,
        gender: currentUser.gender,
      });
    }
  }, [currentUser]);

  const keysToFilter = [
    "_id",
    "rooms",
    "friends",
    "createDate",
    "__v",
    "isOnline",
    "thumbnail",
    "coverPhoto",
    "identity",
    "info",
  ];
  let renderInfo;
  if (currentUser) {
    const { keys, filteredObject } = filterObj(keysToFilter, currentUser);
    filteredObject.password = "";
    filteredObject.birthday = dateConvert("date", currentUser.birthday);
    renderInfo = keys.map((key) => {
      return (
        <div
          key={key}
          className="border-b-2 flex justify-between items-center h-20 w-full"
        >
          <div>
            <h1 className="text-lg my-2 font-semibold">{key}</h1>
            <p className="text-gray-500 text-start">{filteredObject[key]}</p>
          </div>
          <Button
            rounded
            className="w-20 h-10"
            onClick={() => {
              setType(key);
              setShow(true);
            }}
          >
            Change
          </Button>
        </div>
      );
    });
  }
  const handleSubmit = async () => {
    let coverKey;
    let thumbKey;
    if (thumbnail) {
      thumbKey = (await uploadImg({ file: thumbnail })).data;
    }
    if (coverPhoto) {
      coverKey = (await uploadImg({ file: coverPhoto })).data;
    }
    patchUser({
      userId: currentUser._id,
      formData,
      thumbnail: thumbKey || currentUser.thumbnail,
      coverPhoto: coverKey || currentUser.coverPhoto,
    });
    setCoverPhoto(null);
    setThumbnail(null);
    setShow(false);
  };

  return (
    <div className="flex flex-col  mx-12 py-4 md:mx-40 items-center">
      <ThumbnailWithPreview
        previewImg={coverPhoto}
        img={currentUser?.coverPhoto}
        setPreviewImg={setCoverPhoto}
        htmlFor={"coverPhoto"}
        className="h-64  w-full rounded-sm z-0 ml-0 hover:ring-0 active:blur-md active:ring-0 active:scale-100"
      />

      <ThumbnailWithPreview
        previewImg={thumbnail}
        img={currentUser?.thumbnail}
        setPreviewImg={setThumbnail}
        htmlFor={"thumbnail"}
        className={"h-28 w-28 z-10 -mt-14 rounded-full"}
      />
      <div className="group w-full">
        <Textarea
          className="my-2"
          text={"info"}
          noSubmit
          onChange={(e) => {
            setFormData({ ...formData, info: e.target.value });
          }}
        />
      </div>
      {renderInfo}

      <Input
        className="my-2 "
        type={"password"}
        text={"password"}
        id={"password"}
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <Button
        disabled={formData.password === "" || result.isLoading}
        rounded
        primary={formData.password !== ""}
        onClick={handleSubmit}
        className=""
      >
        Save update
      </Button>
      {show && (
        <SettingProfileModel
          handleSubmit={handleSubmit}
          setFormData={setFormData}
          type={type}
          formData={formData}
          onChange={() => {
            setShow(false);
          }}
        />
      )}
    </div>
  );
};

export default Profile;
