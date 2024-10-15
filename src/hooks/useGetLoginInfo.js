import { useGetUserQuery } from "../store";

export default function useGetLoginInfo() {
  const data = useGetUserQuery();
  console.log(data);
  return data;
}
