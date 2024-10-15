import { useGetUserQuery } from "../store";

export default function useGetLoginInfo() {
  const result = useGetUserQuery();
  console.log(result);
  if (result.isSuccess) {
    console.log(result.data);
    return result.data;
  }
}
