import { useGetUserQuery } from "../store";

export default function useGetLoginInfo() {
  // const userInfo = useSelector((state) => {
  //   return state.user.userInfo;
  // });

  const { data } = useGetUserQuery();
  return data;
}
