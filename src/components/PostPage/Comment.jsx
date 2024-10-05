import React from "react";
import { UserTemplate } from "../UserTemplate";

function Comment() {
  return (
    <div className="p-2 border-b-2">
      <UserTemplate
        thumbnailClassname={"h-8 mx-0 my-4 w-8 p-0 justify-center"}
        className={"m-0 p-0 h-9 hover:bg-transparent"}
        firstLineClassname={"text-sm"}
        secondLineClassname={"text-sm "}
        name={"name"}
        info={"time"}
      />
      <p className="ml-4 ">
        123123
        <br />
        content 123
      </p>
    </div>
  );
}

export default Comment;
