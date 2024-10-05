import React, { useState, useEffect, useRef } from "react";
import { useGetMessageQuery, useGetMoreMessageMutation } from "../../store";
import Message from "./Message";
import { LoadingFancy } from "../Loading/LoadingFancy";
import { useParams } from "react-router-dom";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import { useDispatch } from "react-redux";

export function MessageSection({ sendMessageResult }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const roomId = useParams()._id;
  const currentUser = useGetLoginInfo();

  const { data, isLoading } = useGetMessageQuery(roomId);
  const chatRoomElement = useRef();
  const [getMoreMessage, result] = useGetMoreMessageMutation();

  const handleInfiniteScroll = (e) => {
    if (
      e.target.scrollTop === 0 &&
      e.target.scrollHeight > e.target.clientHeight
    ) {
      getMoreMessage({ roomId, page });
      setPage(page + 1);
      e.target.scrollTop += 400;
    }
  };
  useEffect(() => {
    setPage(1);
  }, [roomId]);
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
  }, [chatRoomElement, sendMessageResult]);

  return (
    <div
      className="flex flex-col  justify-start grow mx-2 overflow-y-scroll overflow-x-hidden"
      ref={chatRoomElement}
      onScroll={handleInfiniteScroll}
    >
      {messages}
    </div>
  );
}