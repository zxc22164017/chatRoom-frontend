import ChatRoomDrawer from "./ChatRoomDrawer";
import MessageSection from "./MessageSection";
import Header from "./Header";
import React, { useState } from "react";
import Input from "../Input";
import { IoSend } from "react-icons/io5";
import { useSendMessageMutation, useUploadImgMutation } from "../../store";
import Button from "../Button";
import AddUsersModal from "../../models/AddUsersModal";
import { useParams } from "react-router-dom";
import UploadImg from "../UploadImg";
import { AnimatePresence } from "framer-motion";

const ChatRoom = ({}) => {
  const roomId = useParams()._id;
  const [input, setInput] = useState("");

  const [show, setShow] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [sendMessage, result] = useSendMessageMutation();
  const [uploadImg, imgResult] = useUploadImgMutation();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input) {
      sendMessage({ roomId, input });
      setInput("");
    }
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    const result = await uploadImg({
      file,
      type: "message",
    }).unwrap();
    sendMessage({ roomId, input: result });
  };

  const renderDrawer = show && (
    <ChatRoomDrawer setShow={setShow} setShowUsers={setShowUsers} />
  );
  const renderAddUser = (
    <AnimatePresence mode="wait">
      {showUsers && (
        <AddUsersModal
          onChange={() => {
            setShowUsers(false);
          }}
        />
      )}
    </AnimatePresence>
  );
  return (
    <div id="scrollable div" className="w-full flex flex-col">
      <Header setShow={setShow} />
      <MessageSection sendMessageResult={result} />

      <form
        onSubmit={handleSendMessage}
        className="flex    items-center justify-evenly p-2 pt-0"
      >
        <UploadImg
          className=" rounded-full h-12  w-12 mx-2"
          handleImage={handleImage}
        />
        <Input
          value={input}
          className="border-2 border-topic   "
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          primary
          className="h-12 w-12  rounded-full  ml-2   border-topic "
        >
          <IoSend className="text-xl " />
        </Button>
      </form>

      {renderDrawer}
      {renderAddUser}
    </div>
  );
};

export default ChatRoom;
