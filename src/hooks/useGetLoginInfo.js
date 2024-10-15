import { useGetUserQuery } from "../store";

export default function useGetLoginInfo() {
  const { data, isSuccess } = useGetUserQuery();

  return new Promise((resolve, reject) => {
    if (isSuccess) {
      resolve(data);
    } else {
      reject();
    }
  });
}
