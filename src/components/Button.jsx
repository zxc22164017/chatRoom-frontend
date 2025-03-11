import classNames from "classnames";
import { twMerge } from "tailwind-merge";
import { animate, motion } from "framer-motion";

const Button = ({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  disabled,

  ...rest
}) => {
  const classes = twMerge(
    classNames(
      "px-3 py-1.5 border-2 flex items-center justify-center ",
      rest.className,
      {
        "border-contrast-500 bg-contrast-500 text-white": primary,
        "border-contrast-800 bg-contrast-800 text-white": secondary,
        "border-green-500 bg-green-500 text-white": success,
        "border-yellow-500 bg-yellow-500 text-white": warning,
        "border-red-800 bg-red-500 text-white": danger,
        "border-gray-500 bg-gray-500 text-white hover:cursor-not-allowed  disabled":
          disabled,
      },
      {
        "rounded-full": rounded,
      },
      { "bg-transparent text-black": outline }
    )
  );

  const btnAnimation = {
    initial: {
      scale: 1,
    },
    hover: (disabled) =>
      !disabled && {
        scale: [1.05, 1.1, 1.05, 1.1],
      },
    tap: {
      scale: 0.8,
    },
  };

  return (
    <motion.button
      custom={disabled}
      variants={btnAnimation}
      initial="initial"
      whileHover={"hover"}
      whileTap={"tap"}
      {...rest}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
};

Button.propTypes = {
  checkVariationValue: ({
    primary,
    secondary,
    success,
    warning,
    danger,
    disabled,
  }) => {
    const c =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger) +
      Number(!!disabled);

    if (c > 1) {
      return new Error("only one of these can be true");
    }
  },
};

export default Button;
