import React from "react";
import classNames from "classnames";
import { Thumbnail } from "./Thumbnails/Thumbnail";

export function UserTemplate({
  children,
  name,
  className,
  thumbnailClassname,
  firstLineClassname,
  secondLineClassname,
  info,
  image,
  ...rest
}) {
  const classes = classNames(
    "flex items-center overflow-hidden  hover:bg-slate-200 mx-2 h-auto rounded justify-between",
    className
  );
  const thumbnailClasses = classNames(
    "h-14 w-14 group-active:scale-90",
    thumbnailClassname
  );
  const firstLineClasses = classNames(
    "text-lg group-hover:underline decoration-black group-active:text-blue-500 ",
    firstLineClassname
  );
  const secondLineClasses = classNames(
    "text-sm w-full text-ellipsis  text-slate-500 group-hover:underline  group-active:text-blue-500",
    secondLineClassname
  );

  return (
    <div className={classes} {...rest}>
      <div
        className=" flex items-center group hover:cursor-pointer  "
        {...rest}
      >
        <Thumbnail className={thumbnailClasses} image={image} />
        <div className="px-2 w-36 ">
          <h1 className={firstLineClasses}>{name}</h1>
          <p className={secondLineClasses}>{info}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
