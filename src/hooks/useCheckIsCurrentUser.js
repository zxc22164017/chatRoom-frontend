import { useGetUserQuery } from "../store";

const useCheckIsCurrentUser = (userId) => {
  try {
    const currentUser = useGetUserQuery().data;

    return userId === currentUser?._id ? true : false;
  } catch (error) {
    return false;
  }
};

export default useCheckIsCurrentUser;
