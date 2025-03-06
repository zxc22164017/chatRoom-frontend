import ChatRoom from "../components/chatRoom/ChatRoom";

import SideBar from "../components/chatRoom/SideBar";

const ChatPage = () => {
  return (
    <div className=" bg-white flex flex-grow mt-14 h-96 xl:mx-40  shadow-md">
      <SideBar />
      <ChatRoom />
    </div>
  );
};

export default ChatPage;
