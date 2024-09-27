import PropTypes from "prop-types";
import useConvertToDate from "../../hooks/useConvertToDate";
import { Thumbnail } from "../Thumbnail";

import classNames from "classnames";

const Message = ({ sender, reciever, message, ...rest }) => {
  const classOuter = classNames(
    "max-w-sm my-1 flex items-center group",
    rest.className,
    {
      " self-end": sender,
      " self-start": reciever,
    }
  );
  const classInner = classNames("rounded-md h-auto  p-2 ", {
    "bg-amber-100 ": sender,
    "bg-violet-100 ": reciever,
  });
  const date = useConvertToDate("time", message.createTime);
  return (
    <div className={classOuter}>
      {sender ?? <Thumbnail className={"w-8 h-8 mr-2"} />}
      <div className="relative">
        <div className={classInner}>
          <p className="text-pretty text-lg text-ellipsis">{message.message}</p>
        </div>
        <p className="hidden text-xs group-hover:block text-gray-500">{date}</p>
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
