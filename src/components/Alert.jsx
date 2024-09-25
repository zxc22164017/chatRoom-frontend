import React from "react";
import classNames from "classnames";

const Alert = ({ error, ...rest }) => {
  const classes = classNames(
    "text-sm text-red-700 italic font-medium",
    rest.className
  );
  return error ? (
    <>
      <span className={classes}>{error}</span>
    </>
  ) : (
    <></>
  );
};

export default Alert;
