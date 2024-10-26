import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeSearchType } from "../../store";

const ChatRoomLanding = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(changeSearchType({ label: "users", value: "users" }));
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center gap-4 justify-center">
      <h1 className="font-extrabold text-4xl text-sky-500">
        Click the side bar to start chatting
      </h1>
      <p className="text-lg text-gray-400">or</p>
      <h2 className="font-bold text-3xl text-emerald-500">
        Use the search bar above to find users
      </h2>
    </div>
  );
};

export default ChatRoomLanding;
