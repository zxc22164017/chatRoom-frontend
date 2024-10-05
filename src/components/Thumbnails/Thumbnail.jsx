import { MdFace6 } from "react-icons/md";
import classNames from "classnames";
import React from "react";
export function Thumbnail({
  className,
  children,
  onChange,
  htmlFor,
  upload,
  image,
  ...rest
}) {
  const classes = classNames(
    " rounded-full flex items-center justify-center bg-gray-300 hover:cursor-pointer overflow-hidden",
    { "hover:ring-4 active:ring-8 active:scale-90": upload },

    className ? className : "h-14 w-14 ml-2"
  );

  let content;

  if (image) {
    content = (
      <img
        className="object-cover object-center h-full w-full"
        src={`https://chat-room-asdzxc1234448.s3.ap-northeast-1.amazonaws.com/${image}`}
        alt="profile"
      />
    );
  } else if (children) {
    content = children;
  } else {
    content = <MdFace6 className=" h-full w-full text-white" />;
  }
  return (
    <label htmlFor={htmlFor} className={classes} {...rest}>
      {upload && (
        <input
          onChange={onChange}
          id={htmlFor}
          type="file"
          className="hidden"
          accept="image/*"
        />
      )}
      {content}
    </label>
  );
}
