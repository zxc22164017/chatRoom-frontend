import ChatRoom from "../components/chatRoom/ChatRoom";

import SideBar from "../components/chatRoom/SideBar";

function ChatPage() {
  return (
    <div className=" bg-white flex flex-grow mt-14  mx-40  shadow">
      <SideBar />
      <ChatRoom />
    </div>
  );
}

export default ChatPage;
