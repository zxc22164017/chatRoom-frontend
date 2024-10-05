import React, { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import classNames from "classnames";

const ExpandablePanel = ({
  header,
  children,
  outerClassName,
  expandClassName,
  headerClassName,
}) => {
  const [expend, setExpend] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const handleExpend = () => {
    if (expend === true) {
      setCollapse(true);
      setTimeout(() => {
        setExpend(false);
        setCollapse(false);
      }, 100);
    } else setExpend(!expend);
  };
  const outerClasses = classNames(" rounded", outerClassName);
  const expandClasses = classNames(
    `py-4 px-2 text-sm text-gray-700  text-pretty ${
      collapse ? "animate-collapse" : "animate-expand"
    }`,
    expandClassName
  );
  const headerClasses = classNames(
    "flex p-2 justify-between items-center  hover:cursor-pointer ",
    headerClassName
  );

  return (
    <div className={outerClasses}>
      <div className={headerClasses} onClick={handleExpend}>
        <div className="flex flex-row items-center justify-between text-lg text-pretty ">
          {header}
        </div>
        <div className="cursor-pointer">
          {expend ? <GoChevronLeft /> : <GoChevronDown />}
        </div>
      </div>
      {expend && <div className={expandClasses}>{children}</div>}
    </div>
  );
};

export default ExpandablePanel;
