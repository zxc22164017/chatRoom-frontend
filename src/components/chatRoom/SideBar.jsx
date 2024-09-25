import SideBarItem from "./SideBarItem";
import { useGetRoomsQuery } from "../../store";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import Skeleton from "../Loading/Skeleton";

function SideBar({}) {
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

  return (
    <div className="bg-white   w-96 border-r-2 ">
      <div className="h-16 border-b-2 flex items-center ">
        <h1 className="font-bold text-2xl pl-2  ">Chats</h1>
      </div>
      <div className="flex flex-col">{content}</div>
    </div>
  );
}

export default SideBar;
