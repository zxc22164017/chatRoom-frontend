import React from "react";
import classNames from "classnames";

function NavBarDropdownOption({ onChange, className, children }) {
  const classes = classNames(
    "flex items-center hover:bg-topic-100 rounded cursor-pointer p-2 w-full group",
    className
  );
  return (
    <div onClick={onChange} className={classes}>
      {children}
    </div>
  );
}

export default NavBarDropdownOption;
