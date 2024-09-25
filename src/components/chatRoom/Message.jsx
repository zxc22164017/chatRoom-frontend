import PropTypes from "prop-types";

import classNames from "classnames";

const Message = ({ sender, reciever }) => {
  const classes = classNames("rounded-md h-auto max-w-sm p-2 ", {
    "bg-amber-100 self-end": sender,
    "bg-violet-100 self-start": reciever,
  });
  return (
    <div className={classes}>
      <p className="text-pretty text-ellipsis">
        text-wraptext-wraptext-wraptext-wraptext-wraptext-wraptext-wraptext-wraptext-wraptext-wraptext-wraptext-wraptext-wrap
      </p>
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
