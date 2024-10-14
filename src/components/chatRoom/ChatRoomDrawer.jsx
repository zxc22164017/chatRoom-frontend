import { useEffect, useState } from "react";
import Drawer from "../drawer";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetSingleRoomQuery,
  useUploadImgMutation,
  usePatchRoomMutation,
  useLeaveRoomMutation,
} from "../../store";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import Thumbnail from "../Thumbnails/Thumbnail";
import Button from "../Button";
import Input from "../Input";
import ThumbnailWithPreview from "../Thumbnails/ThumbnailWithPreview";
import DoubleConfirmModal from "../../models/DoubleConfirmModal";
const ChatRoomDrawer = ({ setShow, setShowUsers }) => {
  const nav = useNavigate();
  const { _id } = useParams();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [img, setImg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { data, error, isLoading } = useGetSingleRoomQuery(_id);
  const [patchRoom, patchResult] = usePatchRoomMutation();
  const [uploadImg, result] = useUploadImgMutation();
  const currentUser = useGetLoginInfo();
  const [leaveRoom, leaveResult] = useLeaveRoomMutation({
    fixedCacheKey: "leaveRoom",
  });

  const handleSave = async () => {
    let key;
    if (img) {
      key = (await uploadImg({ file: img })).data;
    }

    if (name !== data.name || img) {
      patchRoom({ name, roomId: _id, image: key || data.thumbnail });
    }

    setEdit(false);
  };
  const handleLeave = () => {
    leaveRoom({ roomId: _id, userId: currentUser._id });
  };
  useEffect(() => {
    if (data?.name) {
      setName(data.name);
    }
  }, [data]);
  useEffect(() => {
    if (patchResult.isSuccess) {
      window.location.reload();
    }
  }, [patchResult]);
  useEffect(() => {
    if (leaveResult.isSuccess) {
      setShow(false);
      nav(`/chat/${currentUser._id}`);
      leaveResult.reset();
    }
  }, [leaveResult]);

  let content;
  if (data) {
    const users = data.users;
    if (data.name) {
      content = (
        <>
          <ThumbnailWithPreview
            previewImg={img}
            img={data.thumbnail}
            upload={edit}
            setPreviewImg={setImg}
            htmlFor={"thumbnail"}
            className={"h-40 w-40 rounded-full hover:cursor-pointer "}
          />
          {edit ? (
            <Input
              id={"name"}
              text={"Room name"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
              className="m-2 py-1"
            />
          ) : (
            <h1 className="text-3xl mt-2">{data.name}</h1>
          )}
          <p className="text-gray-500">users:{data.users.length}</p>
          <div className="flex flex-wrap mt-2 ">
            {data.users.map((user) => {
              return (
                <div className="group flex flex-wrap " key={user._id}>
                  <div className="relative mx-1">
                    <Thumbnail
                      className={"h-10 w-10 hover:cursor-pointer"}
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
            {edit ? (
              <Button primary rounded className="my-2" onClick={handleSave}>
                save
              </Button>
            ) : (
              <Button
                primary
                rounded
                className="my-2"
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit Chatroom
              </Button>
            )}
            <Button
              rounded
              secondary
              className="my-2"
              onClick={() => {
                setShowUsers(true);
                setShow(false);
              }}
            >
              Add users
            </Button>
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              danger
              rounded
            >
              Leave Chatroom
            </Button>
          </div>
          {showModal && (
            <DoubleConfirmModal
              onChange={() => setShowModal(false)}
              handleDelete={handleLeave}
              className="border-2 shadow-lg"
            />
          )}
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
            className={"h-40 w-40 hover:cursor-pointer"}
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
