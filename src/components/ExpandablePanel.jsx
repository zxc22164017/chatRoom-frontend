import React, { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import classNames from "classnames";
import { motion, AnimatePresence, animate } from "framer-motion";

const ExpandablePanel = ({
  header,
  children,
  outerClassName,
  expandClassName,
  headerClassName,
}) => {
  const [expend, setExpend] = useState(false);
  const handleExpend = () => {
    setExpend(!expend);
  };
  const outerClasses = classNames(" rounded", outerClassName);
  const expandClasses = classNames(
    `py-4 px-2 text-sm text-gray-700 grid  text-pretty `,
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
      <AnimatePresence>
        {expend && (
          <motion.div
            initial={{ y: -100, height: 0, opacity: 0 }}
            animate={{ y: 0, height: "100%", opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            exit={{ y: -100, height: 0, opacity: 0 }}
            className={expandClasses}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandablePanel;
