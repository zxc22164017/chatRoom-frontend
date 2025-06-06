import { MdFace6 } from "react-icons/md";
import classNames from "classnames";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const Thumbnail = ({
  className,
  children,
  onChange,
  htmlFor,
  upload,
  image,
  alt,
  ...rest
}) => {
  const classes = classNames(
    " rounded-full flex items-center justify-center bg-gray-300 overflow-hidden",
    {
      "hover:ring-4 active:ring-8 active:scale-90 hover:cursor-pointer": upload,
    },

    className ? className : "h-14 w-14 ml-2"
  );

  let content;
  if (image) {
    content = (
      <LazyLoadImage
        className="object-cover object-center h-full z-0 w-full"
        rel="dns-prefetch"
        effect="blur"
        width={"100%"}
        height={"100%"}
        src={`https://chat-room-asdzxc1234448.s3.ap-northeast-1.amazonaws.com/${image}`}
        alt={alt ? alt : "profile"}
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
};
export default Thumbnail;
