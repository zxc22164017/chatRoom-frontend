import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi";
// import { userReducer, logOut } from "./slices/userSlice";
import { chatRoomApi } from "./apis/chatRoomApi";

const store = configureStore({
  reducer: {
    // user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatRoomApi.reducerPath]: chatRoomApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(chatRoomApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useSignupUserMutation,
  useSigninUserMutation,
  useGetUserQuery,
  useSearchUsersMutation,
  useGetProfileInfoQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} from "./apis/userApi";
export { useGetRoomsQuery } from "./apis/chatRoomApi";
export { store };
