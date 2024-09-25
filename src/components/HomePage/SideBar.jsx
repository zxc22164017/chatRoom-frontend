import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import { IoChatboxEllipsesSharp } from "react-icons/io5";

export function SideBar({}) {
  const currentUser = useGetLoginInfo();
  const [chatLink, setchatLink] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    if (currentUser.friends.length > 0) {
      setchatLink(`/chat/${currentUser.friends[0]}`);
    } else {
      setchatLink("/");
    }
  }, [currentUser]);

  return (
    <div className=" hidden md:block bg-topic-500 w-72 fixed top-14 h-full">
      <div>
        <IoChatboxEllipsesSharp />
        <Link to={chatLink}>chat room</Link>
      </div>
    </div>
  );
}
