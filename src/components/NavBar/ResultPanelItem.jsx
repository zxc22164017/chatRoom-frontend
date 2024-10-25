import React from "react";
import Thumbnail from "../Thumbnails/Thumbnail";

const ResultPanelItem = ({ data, type, ...rest }) => {
  let content;
  if (type === "user") {
    content = (
      <>
        <Thumbnail className={"h-10 w-10"} image={data.thumbnail} />
        <p className="">{data?.username}</p>
      </>
    );
  }
  if (type === "post") {
    content = (
      <>
        <p>{data.title}</p>
      </>
    );
  }

  return (
    <div
      {...rest}
      className="flex gap-4 items-center rounded-lg hover:bg-topic-100 hover:cursor-pointer p-2 active:bg-topic-200 transition-colors duration-100"
    >
      {content}
    </div>
  );
};

export default ResultPanelItem;
