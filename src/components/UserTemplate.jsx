import React from "react";
import classNames from "classnames";
import { Thumbnail } from "./Thumbnail";

export function UserTemplate({ children, name, className, info, ...rest }) {
  const classes = classNames(
    "flex items-center  hover:bg-slate-200 mx-2 h-20 rounded justify-between",
    className
  );

  return (
    <div className={classes} {...rest}>
      <div
        className=" flex items-center group hover:cursor-pointer  "
        {...rest}
      >
        <Thumbnail className={"h-14 w-14 group-active:scale-90"} />
        <div className="px-2">
          <h1 className="text-lg group-hover:underline decoration-black group-active:text-blue-500 ">
            {name}
          </h1>
          <p className="text-sm w-full h-6 text-slate-500 group-hover:underline  group-active:text-blue-500">
            {info}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
