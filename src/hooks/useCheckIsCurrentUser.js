import { useSelector } from "react-redux";

const useCheckIsCurrentUser = (userId) => {
  const currentUser = useSelector((state) => {
    return state.user.userInfo;
  });

  return userId === currentUser?._id ? true : false;
};

export default useCheckIsCurrentUser;
