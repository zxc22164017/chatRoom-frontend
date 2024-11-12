import React from "react";
import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";
import { useState } from "react";

const Drawer = ({ setShow, children, ...rest }) => {
  const [slideOut, setSlidOut] = useState(false);
  const handleClose = () => {
    setSlidOut(true);
    setTimeout(() => {
      setShow(false);
      setSlidOut(false);
    }, 500);
  };

  return ReactDOM.createPortal(
    <div>
      <div className="fixed  inset-0 z-20 bg-black opacity-50"></div>
      <div
        className={`fixed z-50 inset-y-0 right-0 w-96  rounded-md bg-white  ${"animate-slideIn"} ${
          slideOut && "animate-slideOut"
        }`}
      >
        <div className="absolute top-2 left-2 rounded-full hover:ring-2 hover:cursor-pointer ">
          <GrClose
            className="hover:stroke-2 hover:scale-105 text-2xl"
            onClick={handleClose}
          />
        </div>
        <div
          className={`flex flex-col pt-10 items-center h-full overflow-y-auto ${rest.className} `}
        >
          {children}
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
};

export default Drawer;
