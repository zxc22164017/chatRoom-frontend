import { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { motion } from "framer-motion";

import UploadImg from "./UploadImg";
const Textarea = ({
  htmlFor,
  value,
  onChange,
  text,
  img,
  handleImage,
  noSubmit,
  resetImage,
  isLoading,
  ...rest
}) => {
  const textRef = useRef();
  useEffect(() => {
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, [value]);
  const animation = {
    initial: {
      display: "none",
      y: -50,
      scaleY: 0,
    },
    animate: {
      display: "flex",
      y: 0,
      scaleY: 1,
    },
  };
  const [isHover, setIsHover] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => {
        if (!value) setIsHover(false);
      }}
      className={` bg-white group focus-within:border-blue-500 relative border-2 p-2 rounded-lg w-full   ${rest.className}`}
    >
      <motion.textarea
        ref={textRef}
        onChange={onChange}
        value={value}
        name=""
        id={htmlFor}
        placeholder=" "
        className="w-full peer h-6 text-gray-900  bg-white border-0 outline-none  resize-none"
      ></motion.textarea>
      <label
        htmlFor={htmlFor}
        className="absolute hover:cursor-text text-md text-gray-500 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/4 peer-placeholder-shown:top-1/4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {text}
      </label>
      {img && (
        <div className="border-t-2">
          <img
            className="max-h-16 hover:cursor-pointer "
            onClick={resetImage}
            src={URL.createObjectURL(img)}
          />
        </div>
      )}
      {!noSubmit && (
        <motion.div
          variants={animation}
          animate={isHover ? "hover" : "initial"}
          className="flex group justify-between"
        >
          <UploadImg handleImage={handleImage} />
          <Button
            disabled={isLoading || !value}
            primary
            rounded
            className="  h-9 w-24  transition-all duration-150 "
          >
            {text}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Textarea;
