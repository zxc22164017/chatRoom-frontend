import classNames from "classnames";

const Input = ({ text, type, id, onChange, value, ...rest }) => {
  const classes = classNames(
    " group focus-within:border-blue-500 relative border-2 p-2 rounded-lg w-full ",
    rest.className ? rest.className : "mt-6"
  );
  return (
    <div className={classes}>
      <input
        placeholder={rest.placeholder ? rest.placeholder : " "}
        id={id}
        onChange={onChange}
        className="peer focus:outline-none p-1 w-full"
        type={type}
        value={value || ""}
      />
      <label
        htmlFor={id}
        className="absolute hover:cursor-text text-md text-gray-500 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
        {text}
      </label>
    </div>
  );
};

export default Input;
