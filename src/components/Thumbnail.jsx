import { FaUserAlt } from "react-icons/fa";
import classNames from "classnames";
import React from "react";
export function Thumbnail({ className, children, ...rest }) {
  const classes = classNames(
    "ml-2 rounded-full flex items-center justify-center bg-gray-300 hover:cursor-pointer",
    className ? className : "h-14 w-14"
  );
  return (
    <div className={classes} {...rest}>
      {children ? children : <FaUserAlt className="text-2xl text-white" />}
    </div>
  );
}
