import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { Thumbnail } from "./Thumbnails/Thumbnail";
import { GoChevronDown } from "react-icons/go";
import Panel from "./Panel";

const Dropdown = ({
  options,
  value,
  onChange,
  text,
  optClassname,
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
      {isOpen && (
        <Panel className={optionClassname}>
          {options.map((option) => {
            return (
              <div
                className="hover:bg-sky-100 rounded cursor-pointer p-1"
                onClick={() => {
                  handleOptionClick(option);
                }}
                key={option.value}
              >
                {option?.icon && (
                  <Thumbnail className={"h-10 w-10"} image={option.icon} />
                )}
                {option.label}
              </div>
            );
          })}
        </Panel>
      )}
    </div>
  );
};

export default Dropdown;
