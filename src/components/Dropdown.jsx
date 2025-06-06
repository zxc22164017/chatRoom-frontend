import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Thumbnail from "../components/Thumbnails/Thumbnail";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";
import { motion, AnimatePresence } from "framer-motion";

const Dropdown = ({
  options,
  value,
  onChange,
  text,
  optClassname,
  community,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const divElement = useRef();

  const handleClick = () => {
    setIsOpen((current) => !current);
  };
  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };
  const classes = classNames(
    "flex justify-between items-center cursor-pointer ",
    rest.className
  );
  const optionClassname = classNames("absolute top-full z-50", optClassname);
  useEffect(() => {
    const handler = (e) => {
      if (!divElement.current) {
        return;
      }
      if (!divElement.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, []);

  return (
    <div className="w-full relative" ref={divElement}>
      <Panel className={classes} onClick={handleClick}>
        {value?.label || "Select..."}
        <GoChevronDown className="text-lg" />
      </Panel>
      <label className="absolute hover:cursor-text text-md text-gray-500 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
        {text}
      </label>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ ease: "easeInOut", duration: 0.2 }}
          >
            <Panel className={optionClassname}>
              {options.map((option) => {
                return (
                  <div
                    className="hover:bg-sky-100 rounded cursor-pointer p-1 flex items-center group"
                    onClick={() => {
                      handleOptionClick(option);
                    }}
                    key={option.value}
                  >
                    {community && (
                      <Thumbnail
                        className={"h-10 w-10 mr-2"}
                        image={option.icon}
                      />
                    )}
                    <p className="text-nowrap truncate"> {option.label}</p>
                    <span className="text-xs absolute p-1 bg-white opacity-0 group-hover:opacity-100 delay-300 transition-all duration-300">
                      {option.label}
                    </span>
                  </div>
                );
              })}
            </Panel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
