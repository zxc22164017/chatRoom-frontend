import React from "react";
import { IoCaretUpCircleSharp } from "react-icons/io5";
import Button from "./Button";

const BackToTop = () => {
  return (
    <Button
      onClick={() => {
        scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }}
      rounded
      className="fixed group bottom-9 right-9 w-10 h-10 p-0 bg-black border-none"
    >
      <IoCaretUpCircleSharp className="h-full w-full text-violet-100" />
      <div className="opacity-0 absolute w-12 h-5 -top-6 -left-1 bg-white  rounded shadow-xl  group-hover:opacity-100 transition-all delay-200 duration-150 ease-in-out">
        <span className="absolute inset-0 text-xs text-center font-semibold">
          Top
        </span>
      </div>
    </Button>
  );
};

export default BackToTop;
