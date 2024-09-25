const useConvertToDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export default useConvertToDate;
