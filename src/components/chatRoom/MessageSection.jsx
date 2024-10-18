import React, { useState, useEffect, useRef } from "react";
import { useGetMessageQuery, useGetMoreMessageMutation } from "../../store";
import Message from "./Message";
import LoadingFancy from "../Loading/LoadingFancy";
import { useParams } from "react-router-dom";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import { useDispatch } from "react-redux";
import { socketApi } from "../../store/apis/socketApi";

const MessageSection = ({ sendMessageResult }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const roomId = useParams()._id;
  const currentUser = useGetLoginInfo();

  const { data, isLoading } = useGetMessageQuery(roomId);
  const chatRoomElement = useRef();
  const [getMoreMessage, result] = useGetMoreMessageMutation();
  const [noMore, setNoMore] = useState(false);
  const handleInfiniteScroll = (e) => {
    if (
      e.target.scrollTop === 0 &&
      e.target.scrollHeight > e.target.clientHeight &&
      !noMore &&
      !result.isLoading
    ) {
      getMoreMessage({ roomId, page });
      setPage(page + 1);
      e.target.scrollTop += 400;
    }
  };
  useEffect(() => {
    setNoMore(false);
    setPage(1);
  }, [roomId]);
  useEffect(() => {
    if (result.error?.status === 404) {
      setNoMore(true);
    }
  }, [result.error]);
  useEffect(() => {
    return () => {
      dispatch(socketApi.util.resetApiState());
    };
  }, []);

  useEffect(() => {
    if (chatRoomElement) {
      chatRoomElement.current.scroll({
        top: chatRoomElement.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatRoomElement, sendMessageResult]);

  let messages;
  if (isLoading) {
    messages = (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingFancy />
      </div>
    );
  } else if (data) {
    messages = data.map((message, index) => {
      if (message.sender._id === currentUser._id) {
        return <Message key={message._id} sender message={message} />;
      } else {
        return <Message key={message._id} reciever message={message} />;
      }
    });
  }

  return (
    <div
      className="flex flex-col  justify-start grow mx-2 overflow-y-auto overflow-x-hidden"
      ref={chatRoomElement}
      onScroll={handleInfiniteScroll}
    >
      {noMore && (
        <div className="flex items-center justify-center">
          <p>No More</p>
        </div>
      )}
      {messages}
    </div>
  );
};

export default MessageSection;
