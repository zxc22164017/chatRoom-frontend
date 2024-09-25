import { Header } from "./Header";
import React from "react";
import Input from "../Input";
import { IoSend } from "react-icons/io5";

import Button from "../Button";
import Message from "./Message";
function ChatRoom({}) {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <div className="flex flex-col-reverse justify-start grow mx-2 overflow-y-scroll">
        <Message sender />
        <Message reciever />
      </div>
      <form action="" className="flex  items-center justify-evenly mx-2 my-2">
        <Input className="border-2 border-topic " />
        <Button className="h-12 w-12  rounded-full  ml-2 mt-6  border-topic ">
          <IoSend className="text-xl " />
        </Button>
      </form>
    </div>
  );
}

export default ChatRoom;
