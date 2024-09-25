import { useGetUserQuery } from "../store";

export function useDetectLogin() {
  const { isSuccess } = useGetUserQuery();

  return isSuccess;
}
