import React from "react";
import classNames from "classnames";

const LoadingDot = ({ className }) => {
  const classes = classNames(
    "w-4 h-4 rounded-full  animate-bounce ",
    className
  );
  return (
    <div className="flex flex-row gap-2">
      <div className={classes}></div>
      <div className={"[animation-delay:-.3s] " + classes}></div>
      <div className={"[animation-delay:-.5s] " + classes}></div>
    </div>
  );
};

export default LoadingDot;
