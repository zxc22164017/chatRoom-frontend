import useConvertToDate from "../../hooks/useConvertToDate";
import Thumbnail from "../Thumbnails/Thumbnail";
import useIsUrl from "../../hooks/useIsUrl";

import classNames from "classnames";

const Message = ({ sender, reciever, message, ...rest }) => {
  const url = useIsUrl(message.message);
  let content;

  if (url === "img") {
    content = (
      <Thumbnail className={"rounded-none max-w-96"} image={message.message} />
    );
  } else if (url === "anchor") {
    content = (
      <a
        href={message.message}
        className="text-pretty text-blue-700 underline text-lg "
        style={{ wordBreak: "break-word" }}
      >
        {message.message}
      </a>
    );
  } else {
    content = <p className="text-pretty text-lg ">{message.message}</p>;
  }

  const classOuter = classNames(
    "max-w-sm flex  items-center group flex-wrap",
    rest.className,
    {
      " self-end text-end": sender,
      " self-start": reciever,
    }
  );
  const classInner = classNames("rounded-md h-auto  p-2 ", {
    "bg-topic-100 ": sender,
    "bg-contrast-50 ": reciever,
  });

  const date = useConvertToDate("time", message.createTime);

  return (
    <div className={classOuter}>
      {sender ?? (
        <Thumbnail
          className={"w-8 h-8 mr-2"}
          image={message.sender.thumbnail}
        />
      )}
      <div className="relative">
        <div className={classInner}>{content}</div>
        <p className="  opacity-0 text-xs group-hover:opacity-100   text-gray-500">
          {date}
        </p>
      </div>
    </div>
  );
};

Message.propTypes = {
  checkVariationValue: ({ sender, reciever }) => {
    if (sender && reciever) {
      throw new Error("message can either be sender or reciever");
    }
  },
};

export default Message;
