import SideBarItem from "./SideBarItem";
import { useGetRoomsQuery } from "../../store";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import Skeleton from "../Loading/Skeleton";
import { IoCreateSharp } from "react-icons/io5";
import Button from "../Button";
import ChatRoomModal from "../../models/ChatRoomModal";
import { useEffect, useState } from "react";
import { useLeaveRoomMutation } from "../../store";

const SideBar = ({}) => {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useGetLoginInfo();
  const [page, setPage] = useState(0);
  const [noMore, setNoMore] = useState(false);
  const [, leaveResult] = useLeaveRoomMutation({
    fixedCacheKey: "leaveRoom",
  });
  const [skip, setSkip] = useState(true);
  const { data, error, isLoading } = useGetRoomsQuery(
    {
      userId: currentUser?._id,
      page,
    },
    { skip: skip }
  );
  console.log(currentUser, skip);

  const handleScroll = (e) => {
    if (e.target.scrollHeight > e.target.clientHeight) {
      if (
        e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight &&
        !noMore
      ) {
        setPage(page + 1);
      }
    }
  };
  useEffect(() => {
    if (currentUser) {
      setSkip(false);
    }
  }, [currentUser]);
  useEffect(() => {
    if (error) {
      if (error.status === 404) {
        setNoMore(true);
      }
    }
  }, [error]);
  useEffect(() => {
    if (leaveResult.isSuccess) {
      setPage(0);
      setNoMore(false);
    }
  }, [leaveResult]);

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
    <div
      onScroll={handleScroll}
      className="bg-white w-16 lg:w-96 overflow-y-auto  border-r-2 relative"
    >
      {chatRoomModal}
      <div className="sticky top-0 z-10 bg-white flex justify-between h-16 border-b-2  items-center ">
        <h1 className=" hidden lg:block font-bold text-2xl pl-2  ">Chats</h1>
        <Button
          className={
            "rounded-full border-none lg:mx-4 h-12 w-12 hover:bg-slate-200"
          }
          onClick={() => {
            setShowModal(true);
          }}
        >
          <IoCreateSharp className="w-full h-full" />
        </Button>
      </div>
      <div className="flex flex-col  xl:p-0">{content}</div>
    </div>
  );
};

export default SideBar;
