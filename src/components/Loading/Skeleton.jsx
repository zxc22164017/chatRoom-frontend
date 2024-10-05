import { Thumbnail } from "../Thumbnails/Thumbnail";
import React from "react";
import classNames from "classnames";

const Skeleton = ({ times, className }) => {
  const outerClassNames = classNames(
    "animate-pulse flex items-center",
    className
  );

  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={outerClassNames}>
          <div className=" flex items-center border-b-2 w-full hover:cursor-pointer ">
            <Thumbnail />
            <div className="px-2">
              <div className=" bg-gray-300 rounded-full w-16 h-6 "></div>
              <div className=" bg-gray-300 rounded-full mt-2 w-16 h-2"></div>
            </div>
          </div>
        </div>
      );
    });
  return boxes;
};

export default Skeleton;
