import React from "react";
import Button from "../Button";
import { BsFillTelephoneFill, BsFillInfoCircleFill } from "react-icons/bs";
import { Thumbnail } from "../Thumbnail";
export function Header({}) {
  return (
    <div className="shadow flex items-center justify-between px-2  h-16 ">
      <div className=" group hover:bg-slate-400 h-full rounded flex items-center ">
        <Thumbnail className={"h-12 w-12"} />
        <div className="px-2">
          <h1 className="group-hover:text-slate-50">Name</h1>
          <p className="text-xs group-hover:text-slate-100">Last online</p>
        </div>
      </div>

      <div className="flex">
        <Button className={"rounded-full border-none h-10 hover:bg-slate-200"}>
          <BsFillTelephoneFill />
        </Button>
        <Button className={"rounded-full border-none h-10 hover:bg-slate-200"}>
          <BsFillInfoCircleFill />
        </Button>
      </div>
    </div>
  );
}
