const useConvertToDate = (type, time) => {
  if (type === "date") {
    return new Date(time).toLocaleDateString();
  } else if (type === "time") {
    return new Date(time).toLocaleTimeString();
  }
};

export default useConvertToDate;
