import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useGetNotificationQuery } from "../../store";
import Panel from "../Panel";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import useConvertToDate from "../../hooks/useConvertToDate";

const Notification = () => {
  const { data, isFetching, error } = useGetNotificationQuery();
  const nav = useNavigate();
  const [notify, setNotify] = useState(false);
  const [show, setShow] = useState(false);
  //   const [audio] = useState(new Audio("./notification.mp3"));

  const handleShow = () => {
    setNotify(false);
    setShow(!show);
  };

  useEffect(() => {
    if (data) {
      if (data.length !== 0) {
        setNotify(true);
      }
    }
  }, [data]);

  let content = <div className="text-sm">Nothing happened</div>;

  if (data) {
    if (data?.length !== 0) {
      content = data.map((item, index) => {
        return (
          <div
            onClick={() => {
              nav(`/chat/${item.roomId}`);
            }}
            key={index}
            className="relative text-sm hover:bg-sky-100 p-2 border-b-2 hover:cursor-pointer active:bg-sky-200"
          >
            {item.notification}
          </div>
        );
      });
    }
  }

  return (
    <div className="relative">
      <Button
        onClick={handleShow}
        className="relative p-0 h-10 w-10 border-none active:ring-0 active:scale-90 "
      >
        <IoMdNotificationsOutline className="w-full h-full text-white" />
        {notify && (
          <div className="absolute h-2 w-2 top-0 right-0 rounded-full bg-green-500"></div>
        )}
      </Button>
      {show && (
        <Panel
          className={
            "max-h-60 overflow-y-auto absolute right-0 z-10 mt-2 w-48  rounded-md bg-white shadow-lg "
          }
        >
          {content}
        </Panel>
      )}
    </div>
  );
};

export default Notification;
