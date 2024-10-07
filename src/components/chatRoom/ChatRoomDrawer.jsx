import { useState } from "react";
import Drawer from "../drawer";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../store";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import Thumbnail from "../Thumbnails/Thumbnail";
import { useUploadImgMutation } from "../../store";
import Button from "../Button";

const ChatRoomDrawer = ({ setShow }) => {
  const nav = useNavigate();
  const { _id } = useParams();

  const { data, error, isLoading } = useGetSingleRoomQuery(_id);
  const [uploadImg, result] = useUploadImgMutation();
  const currentUser = useGetLoginInfo();
  const handleRoomThumbnail = (e) => {
    uploadImg({ file: e.target.files[0], type: "room", id: _id });
  };

  let content;
  if (data) {
    const users = data.users;
    if (data.name) {
      content = (
        <>
          <Thumbnail
            className={"h-40 w-40"}
            upload
            onChange={handleRoomThumbnail}
            htmlFor={"roomThumbnail"}
            image={data.thumbnail}
          />
          <h1 className="text-3xl mt-2">{data.name}</h1>
          <p className="text-gray-500">users:{data.users.length}</p>
          <div className="flex flex-wrap mt-2 ">
            {data.users.map((user) => {
              return (
                <div className="group flex flex-wrap" key={user._id}>
                  <div className="relative mx-1">
                    <Thumbnail
                      className={"h-10 w-10"}
                      image={user.thumbnail}
                      onClick={() => {
                        nav(`/profile/${user._id}`);
                      }}
                    />
                    <p className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      {user.username}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6">
            <Button primary rounded className="my-2">
              Edit Chatroom
            </Button>
            <Button danger rounded>
              Leave Chatroom
            </Button>
          </div>
        </>
      );
    } else {
      const userToDisplay = users.find((user) => {
        if (user._id !== currentUser._id) {
          return user;
        }
      });
      content = (
        <>
          <Thumbnail
            className={"h-40 w-40"}
            image={userToDisplay.thumbnail}
            onClick={() => {
              nav(`/profile/${userToDisplay._id}`);
            }}
          />
          <h1 className="text-3xl mt-2">{userToDisplay.username}</h1>
        </>
      );
    }
  }

  return <Drawer setShow={setShow}>{content}</Drawer>;
};

export default ChatRoomDrawer;
