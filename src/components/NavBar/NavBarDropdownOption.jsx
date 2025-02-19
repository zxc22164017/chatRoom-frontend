import classNames from "classnames";

const NavBarDropdownOption = ({ onChange, className, children }) => {
  const classes = classNames(
    "flex items-center hover:bg-sky-100 rounded cursor-pointer p-2 w-full group",
    className
  );
  return (
    <div onClick={onChange} className={classes}>
      {children}
    </div>
  );
};

export default NavBarDropdownOption;
