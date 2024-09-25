const useFilterObject = (keysToFilter, data) => {
  const filteredObject = {};
  const keys = Object.keys(data).filter((key) => !keysToFilter.includes(key));
  for (const key in data) {
    if (!keysToFilter.includes(key)) {
      filteredObject[key] = data[key];
    }
  }

  return { keys, filteredObject };
};
export default useFilterObject;
