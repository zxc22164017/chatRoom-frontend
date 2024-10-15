import { useGetUserQuery } from "../store";

export default function useGetLoginInfo() {
  const { data } = useGetUserQuery();
  return data;
}
