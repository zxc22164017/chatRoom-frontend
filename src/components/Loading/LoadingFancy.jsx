import React from "react";
import classNames from "classnames";
export function LoadingFancy() {
  const loadingCircle = classNames(
    "absolute w-[20px] h-[20px] animate-loadingCircle bg-sky-500 origin-center rounded-full z-10 "
  );
  const loadingShadow = classNames(
    "absolute w-[20px] h-[2px] bg-black opacity-50 blur-[2px] rounded-full top-[84px] origin-center animate-loadingShadow  "
  );
  return (
    <div className="w-[200px] h-[60px] relative ">
      <div className={loadingCircle + "left-[15%]"}></div>
      <div
        className={loadingCircle + "left-[45%] [animation-delay:0.2s]"}
      ></div>
      <div
        className={
          loadingCircle + "left-auto right-[15%] [animation-delay:0.3s]"
        }
      ></div>
      <div className={loadingShadow + "left-[15%]"}></div>
      <div
        className={loadingShadow + "left-[45%] [animation-delay:0.2s]"}
      ></div>
      <div
        className={
          loadingShadow + "left-auto right-[15%] [animation-delay:0.3s]"
        }
      ></div>

      <span className="absolute top-[82px] text-purple-500 font-bold text-2xl tracking-[12px] left-[15%]">
        Loading
      </span>
    </div>
  );
}
