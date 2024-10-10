const useConvertToDate = (type, time) => {
  if (type === "date") {
    return new Date(time).toLocaleDateString();
  } else if (type === "time") {
    if (time === "sending") {
      return time;
    }

    let result = Date.now() - new Date(time);

    result = Math.floor(result / 1000);

    if (result < 60) {
      return "< 1 min";
    }
    result = Math.floor(result / 60);
    if (result < 60) {
      return `${result} min ago`;
    }
    result = Math.floor(result / 60);
    if (result < 24) {
      return `${result} h ago`;
    }
    result = Math.floor(result / 24);
    if (result < 2) {
      return `yesterday`;
    }
    return new Date(time).toLocaleDateString();
  } else {
    throw new Error("args is incorrected");
  }
};

export default useConvertToDate;
