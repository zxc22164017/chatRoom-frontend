import { Header } from "./Header";
import React, { useEffect, useRef, useState } from "react";
import Input from "../Input";
import { IoSend } from "react-icons/io5";
import { useGetMessageQuery, useSendMessageMutation } from "../../store";
import Button from "../Button";
import Message from "./Message";
import { useParams } from "react-router-dom";
import { LoadingFancy } from "../Loading/LoadingFancy";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";

function ChatRoom({}) {
  const chatRoomElement = useRef();
  const roomId = useParams()._id;
  const currentUser = useGetLoginInfo();
  const { data, isLoading } = useGetMessageQuery(roomId);
  const [input, setInput] = useState("");
  const [sendMessage, result] = useSendMessageMutation();
  let messages;

  if (isLoading) {
    messages = <LoadingFancy />;
  } else if (data) {
    messages = data.map((message, index) => {
      if (message.sender._id === currentUser._id) {
        return <Message key={message._id} sender message={message} />;
      } else {
        return <Message key={message._id} reciever message={message} />;
      }
    });
  }
  useEffect(() => {
    if (chatRoomElement) {
      chatRoomElement.current.scrollTop = chatRoomElement.current.scrollHeight;
    }
  }, [chatRoomElement, data]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input) {
      sendMessage({ roomId, input });
      setInput("");
    }
  };

  return (
    <div className="w-full flex flex-col">
      <Header />
      <div
        className="flex flex-col justify-start grow mx-2 overflow-y-scroll"
        ref={chatRoomElement}
      >
        {messages}
      </div>
      <form
        onSubmit={handleSendMessage}
        className="flex  items-center justify-evenly mx-2 my-2"
      >
        <Input
          value={input}
          className="border-2 border-topic "
          onChange={(e) => setInput(e.target.value)}
        />
        <Button className="h-12 w-12  rounded-full  ml-2 mt-6  border-topic ">
          <IoSend className="text-xl " />
        </Button>
      </form>
    </div>
  );
}

export default ChatRoom;
