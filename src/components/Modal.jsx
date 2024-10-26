import { useEffect } from "react";
import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";
import { motion } from "framer-motion";

const Modal = ({ onChange, children, actionBar, className }) => {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);
  const animation = {
    hidden: {
      y: -1000,
      x: -1000,
      skew: "30deg",
    },
    visible: {
      y: 0,
      x: 0,
      skew: 0,
    },
    exit: {
      y: 1000,
      x: 1000,
      skew: "60deg",
      scale: 0,
    },
  };

  return ReactDOM.createPortal(
    <div>
      <div className="fixed inset-0 z-40  bg-black opacity-50"></div>
      <motion.div
        variants={animation}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed z-50 inset-y-10 inset-x-10 xl:inset-x-1/3 p-10 rounded-md bg-white ${className}`}
      >
        <div className="absolute top-2 left-2 rounded-full hover:ring-2 hover:cursor-pointer ">
          <GrClose
            className="hover:stroke-2 hover:scale-105"
            onClick={onChange}
          />
        </div>
        <div className="flex flex-col justify-between items-center h-full">
          {children}
          <div className="flex justify-end">{actionBar}</div>
        </div>
      </motion.div>
    </div>,
    document.querySelector(".modal-container")
  );
};

export default Modal;
