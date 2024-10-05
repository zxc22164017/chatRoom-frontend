import React from "react";

import classNames from "classnames";

const Panel = ({ children, className, ...rest }) => {
  const finalClassNames = classNames(
    "border rounded p-3 shadow bg-white ",
    className
  );
  return (
    <div className={finalClassNames} {...rest}>
      {children}{" "}
    </div>
  );
};

export default Panel;
