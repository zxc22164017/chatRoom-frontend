import SideBarItem from "./SideBarItem";
import { useGetRoomsQuery } from "../../store";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import Skeleton from "../Loading/Skeleton";
import { IoCreateSharp } from "react-icons/io5";
import Button from "../Button";
import ChatRoomModal from "../../models/ChatRoomModal";
import { useState } from "react";

function SideBar({}) {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useGetLoginInfo();
  const { data, error, isLoading } = useGetRoomsQuery(currentUser?._id);

  let content;

  if (isLoading) {
    content = <Skeleton />;
  } else if (data) {
    content = data.map((room) => {
      return (
        <SideBarItem key={room._id} object={room} currentUser={currentUser} />
      );
    });
  }
  const chatRoomModal = showModal && (
    <ChatRoomModal
      onChange={() => {
        setShowModal(false);
      }}
    />
  );

  return (
    <div className="bg-white w-16 md:w-96 overflow-y-auto border-r-2 ">
      {chatRoomModal}
      <div className="flex justify-between h-16 border-b-2  items-center ">
        <h1 className=" hidden md:block font-bold text-2xl pl-2  ">Chats</h1>
        <Button
          className={
            "rounded-full border-none md:mx-4 h-12 w-12 hover:bg-slate-200"
          }
          onClick={() => {
            setShowModal(true);
          }}
        >
          <IoCreateSharp className="w-full h-full" />
        </Button>
      </div>
      <div className="flex flex-col pt-16 md:p-0">{content}</div>
    </div>
  );
}

export default SideBar;
