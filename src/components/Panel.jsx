import React from "react";

import classNames from "classnames";

const Panel = ({ children, className, ...rest }) => {
  const finalClassNames = classNames(
    "border rounded p-3 shadow  ",
    className ? className : "bg-white"
  );
  return (
    <div className={finalClassNames} {...rest}>
      {children}{" "}
    </div>
  );
};

export default Panel;
