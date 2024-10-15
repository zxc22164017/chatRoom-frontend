import React, { useEffect, useState } from "react";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Communities from "./Communities";
import Button from "../Button";

const SideBar = ({}) => {
  const nav = useNavigate();
  const currentUser = useGetLoginInfo().then((res) => res);
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
    <div className="block w-12 h-1/3 rounded  xl:w-60 fixed top-14 xl:mt-0 xl:h-full xl:rounded-none">
      <div
        onClick={handleNavChat}
        className="flex items-center w-full h-20 xl:p-4   hover:cursor-pointer hover:bg-topic-300"
      >
        <IoChatboxEllipsesSharp className="text-sky-500 w-full h-full xl:h-8 xl:w-8 mx-2" />
        <h1 className="hidden xl:block text-xl">chat room</h1>
      </div>
      <Communities />
      {isAdmin && (
        <Button
          className="overflow-hidden border-none "
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
