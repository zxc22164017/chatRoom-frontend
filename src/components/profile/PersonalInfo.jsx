import { AddFriendButton } from "./AddFriendButton";
import React, { useEffect, useState } from "react";
import { Thumbnail } from "../Thumbnails/Thumbnail";
import Button from "../Button";
import { useGetProfileInfoQuery, useUploadImgMutation } from "../../store";
import LoadingDot from "../Loading/LoadingDot";
import Alert from "../Alert";
import useConvertToDate from "../../hooks/useConvertToDate";
import useFilterObject from "../../hooks/useFilterObject";
import useCheckIsCurrentUser from "../../hooks/useCheckIsCurrentUser";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";

export function PersonalInfo({ id }) {
  const currentUser = useGetLoginInfo();
  const { data, error, isLoading } = useGetProfileInfoQuery(id);

  const dateConvert = useConvertToDate;
  const filterObj = useFilterObject;
  const check = useCheckIsCurrentUser(id);
  const [upload, result] = useUploadImgMutation();

  const handleThumbnail = (e) => {
    upload({
      file: e.target.files[0],
      type: "userThumbnail",
      id: currentUser._id,
    });
  };
  const handleCoverPhoto = (e) => {
    upload({
      file: e.target.files[0],
      type: "userCoverPhoto",
      id: currentUser._id,
    });
  };

  let content;

  if (isLoading) {
    content = (
      <div className="flex h-96 justify-center rounded items-center  bg-white shadow-lg">
        <LoadingDot className={"bg-topic-800 "} />
      </div>
    );
  }
  if (data) {
    const keysToFilter = [
      "email",
      "_id",
      "username",
      "friends",
      "createDate",
      "__v",
      "isOnline",
      "thumbnail",
      "coverPhoto",
    ];
    const { keys, filteredObject } = filterObj(keysToFilter, data);

    filteredObject.birthday = dateConvert("date", data.birthday);
    const renderInfo = keys.map((key) => {
      return (
        <p key={key} className="text-slate-500">
          {key} : {filteredObject[key]}
        </p>
      );
    });

    content = (
      <div className="flex flex-col rounded bg-white shadow-lg">
        <Thumbnail
          htmlFor={"coverPhoto"}
          onChange={handleCoverPhoto}
          upload={check}
          image={data.coverPhoto}
          className={
            "bg-gray-700 h-64  rounded-sm ml-0 hover:ring-0 active:blur-md active:ring-0 active:scale-100 "
          }
        />
        <Thumbnail
          onChange={handleThumbnail}
          htmlFor={"thumbnail"}
          upload={check}
          image={data.thumbnail}
          className={
            "w-48 h-48 self-center -mt-24 z-10 border-2 border-black hover:border-none   "
          }
        />

        <div className="flex flex-col md:flex-row justify-between items-center border-b-2 p-2 ">
          <div className="hidden w-48 p-2  md:flex flex-col -mt-24 ">
            {renderInfo}
          </div>
          <div className="flex flex-col justify-center items-center ">
            <h1 className="text-3xl text-center ">{data.username}</h1>
            <p>friends:{data.friends.length}</p>
          </div>
          {check ? (
            <Button
              primary
              rounded
              className={" w-48 h-12 ml-0 mr-4 xl:-mt-24"}
            >
              Edit Profile
            </Button>
          ) : (
            <AddFriendButton currentUser={currentUser} id={id} />
          )}
          <div className="flex w-48 p-2  md:hidden flex-col text-center ">
            {renderInfo}
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    <Alert error={"Something went worng"} />;
  }

  return content;
}
