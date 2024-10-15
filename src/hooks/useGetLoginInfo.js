import { useGetUserQuery } from "../store";

export default function useGetLoginInfo() {
  const result = useGetUserQuery();
  console.log(result.currentData);
  return result.currentData;
}
