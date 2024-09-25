import React from "react";
import classNames from "classnames";

const Progress = ({ page }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
      <div
        className="bg-blue-600 text-xs font-medium text-center p-0.5 leading-none rounded-full text-blue-100"
        style={{ width: `${page}%` }}
      >
        {page}
      </div>
    </div>
  );
};

export default Progress;
