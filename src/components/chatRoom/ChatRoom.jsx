import { ChatRoomDrawer } from "./ChatRoomDrawer";
import { MessageSection } from "./MessageSection";
import { Header } from "./Header";
import React, { useState } from "react";
import Input from "../Input";
import { IoSend } from "react-icons/io5";
import { useSendMessageMutation } from "../../store";
import Button from "../Button";

import { useParams } from "react-router-dom";

function ChatRoom({}) {
  const roomId = useParams()._id;
  const [input, setInput] = useState("");

  const [show, setShow] = useState(false);

  const [sendMessage, result] = useSendMessageMutation();
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input) {
      sendMessage({ roomId, input });
      setInput("");
    }
  };

  const renderDrawer = show && <ChatRoomDrawer setShow={setShow} />;

  return (
    <div id="scrollable div" className="w-full flex flex-col">
      <Header setShow={setShow} />
      <MessageSection sendMessageResult={result} />

      <form
        onSubmit={handleSendMessage}
        className="flex    items-center justify-evenly p-2 pt-0"
      >
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
    </div>
  );
}

export default ChatRoom;
