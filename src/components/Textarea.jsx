import React from "react";
import Button from "./Button";
function Textarea() {
  return (
    <form className=" sticky bottom-1">
      <div className=" bg-white group focus-within:border-blue-500 relative border-2 p-2 rounded-lg w-full">
        <textarea
          name=""
          id="comment"
          placeholder=" "
          className="w-full peer h-6 text-gray-900  bg-white border-0 outline-none transition-all duration-150 group-hover:h-20 focus:h-20"
        ></textarea>
        <label
          htmlFor="comment"
          className="absolute hover:cursor-text text-md text-gray-500 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          Comment
        </label>
        <Button
          primary
          rounded
          className="hidden group-hover:block  absolute right-1 bottom-1 h-9 w-24  transition-all duration-150 "
        >
          Comment
        </Button>
      </div>
    </form>
  );
}

export default Textarea;
