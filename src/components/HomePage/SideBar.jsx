import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Communities from "./Communities";
import Button from "../Button";

const SideBar = ({}) => {
  const nav = useNavigate();
  const currentUser = useGetLoginInfo();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!currentUser) return;
    if (currentUser.identity === "admin") {
      setIsAdmin(true);
    }
  }, [currentUser]);
  const handleNavChat = () => {
    nav(`/chat/${currentUser?._id}`);
  };

  return (
    <div className="block w-12 h-1/3 rounded  md:bg-topic-500 md:w-60 fixed top-14 md:mt-0 md:h-full md:rounded-none">
      <div
        onClick={handleNavChat}
        className="flex items-center w-full h-20 md:p-4   hover:cursor-pointer hover:bg-topic-300"
      >
        <IoChatboxEllipsesSharp className="text-sky-500 w-full h-full md:h-8 md:w-8 mx-2" />
        <h1 className="hidden md:block text-xl">chat room</h1>
      </div>
      <Communities />
      {isAdmin && (
        <Button
          onClick={() => {
            nav("/rhufiewjifewfwepfNewCommunity");
          }}
        >
          add community
        </Button>
      )}
    </div>
  );
};

export default SideBar;
