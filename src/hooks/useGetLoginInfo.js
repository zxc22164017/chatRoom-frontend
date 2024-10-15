import { useGetUserQuery } from "../store";

export default function useGetLoginInfo() {
  const result = useGetUserQuery();

  if (result.isSuccess) {
    return result.data;
  }
}
