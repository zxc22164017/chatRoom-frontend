import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi";

import { chatRoomApi } from "./apis/chatRoomApi";
import { socketApi } from "./apis/socketApi";

const store = configureStore({
  reducer: {
    // user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatRoomApi.reducerPath]: chatRoomApi.reducer,
    [socketApi.reducerPath]: socketApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(chatRoomApi.middleware)
      .concat(socketApi.middleware);
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
export { useGetMessageQuery, useSendMessageMutation } from "./apis/socketApi";
export { useGetRoomsQuery } from "./apis/chatRoomApi";
export { store };
