import { useGetUserQuery } from "../store";

const useCheckIsCurrentUser = (userId) => {
  const currentUser = useGetUserQuery().data;

  return userId === currentUser?._id ? true : false;
};

export default useCheckIsCurrentUser;
