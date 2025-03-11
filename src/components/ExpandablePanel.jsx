import React, { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

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
  const expandAnimation = {
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3, // Stagger children by .3 seconds
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    hidden: {
      y: 100,
      opacity: 0,
      transition: {
        when: "afterChildren",
        y: { stiffness: 1000 },
      },
    },
  };

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
          <motion.ul
            variants={expandAnimation}
            animate={expend ? "open" : "hidden"}
            exit={"hidden"}
            className={expandClasses}
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandablePanel;
