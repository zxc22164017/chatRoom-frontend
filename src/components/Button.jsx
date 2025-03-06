import classNames from "classnames";
import { twMerge } from "tailwind-merge";

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
      "px-3 py-1.5 border-2 flex items-center justify-center hover:animate-btnHover active:ring w-full active:scale-90 transition-all duration-150 ease-in-out",
      rest.className,
      {
        "border-contrast-500 bg-contrast-500 text-white": primary,
        "border-contrast-800 bg-contrast-800 text-white": secondary,
        "border-green-500 bg-green-500 text-white": success,
        "border-yellow-500 bg-yellow-500 text-white": warning,
        "border-red-800 bg-red-500 text-white": danger,
        "border-gray-500 bg-gray-500 text-white hover:cursor-not-allowed hover:scale-100 active:ring-0 disabled":
          disabled,
      },
      {
        "rounded-full": rounded,
      },
      { "bg-transparent text-black": outline }
    )
  );

  return (
    <button {...rest} disabled={disabled} className={classes}>
      {children}
    </button>
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
