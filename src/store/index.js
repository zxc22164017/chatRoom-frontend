import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./apis/userApi";
import { uploadApi } from "./apis/uploadApi";
import { chatRoomApi } from "./apis/chatRoomApi";
import { socketApi } from "./apis/socketApi";
import postApi from "./apis/postApi";
import CommunityApi from "./apis/communityApi";

const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [chatRoomApi.reducerPath]: chatRoomApi.reducer,
    [socketApi.reducerPath]: socketApi.reducer,
    [uploadApi.reducerPath]: uploadApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [CommunityApi.reducerPath]: CommunityApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(chatRoomApi.middleware)
      .concat(socketApi.middleware)
      .concat(uploadApi.middleware)
      .concat(postApi.middleware)
      .concat(CommunityApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useLogoutMutation,
  useSignupUserMutation,
  useSigninUserMutation,
  useGetUserQuery,
  useSearchUsersMutation,
  useGetProfileInfoQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} from "./apis/userApi";
export {
  useGetMessageQuery,
  useSendMessageMutation,
  useGetMoreMessageMutation,
} from "./apis/socketApi";
export {
  useGetRoomsQuery,
  useGetSingleRoomQuery,
  useAddRoomMutation,
} from "./apis/chatRoomApi";
export { useUploadImgMutation } from "./apis/uploadApi";
export {
  useGetPostsQuery,
  useAddPostMutation,
  useGetSinglePostQuery,
} from "./apis/postApi";
export { useGetCommunitiesQuery } from "./apis/communityApi";
export { store };
