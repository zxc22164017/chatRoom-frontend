import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useDetectLogin } from "../../hooks/useDetectLogin";
import axios from "axios";
import { userApi } from "./userApi";
import { chatRoomApi } from "./chatRoomApi";
import postApi from "./postApi";
import commentApi from "./commentApi";

const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/upload",
    prepareHeaders: (headers) => {
      const token = useDetectLogin();

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints(builder) {
    return {
      uploadImg: builder.mutation({
        async queryFn(
          { file, type, id },
          baseQueryApi,
          extraOptions,
          baseQuery
        ) {
          const token = useDetectLogin();
          let presignedUrl;
          let key;
          try {
            if (token) {
              const { data } = await baseQuery({
                url: "/presign",
                method: "GET",
              });
              presignedUrl = data.presignedUrl;
              key = data.key;
            }

            const res = await axios.put(presignedUrl, file, {
              headers: {
                "Content-Type": file.type,
              },
            });

            if (type === "userThumbnail") {
              const data = await baseQuery({
                url: "/user",
                method: "POST",
                body: {
                  key,
                  type: "thumbnail",
                },
              });

              return { data: null, error: null };
            } else if (type === "userCoverPhoto") {
              const data = await baseQuery({
                url: "/user",
                method: "POST",
                body: {
                  key,
                  type: "coverPhoto",
                },
              });
              return { data: null, error: null };
            } else if (type === "room") {
              const data = await baseQuery({
                url: "/room",
                method: "POST",
                body: {
                  key: key,
                  roomId: id,
                },
              });

              return { data: null, error: null };
            } else if (type === "post") {
              const data = await baseQuery({
                url: "/post",
                method: "POST",
                body: {
                  key: key,
                  postId: id,
                },
              });
              return { data: null, error: null };
            } else if (type === "comment") {
              const data = await baseQuery({
                url: "/comment",
                method: "POST",
                body: {
                  key: key,
                  commentId: id,
                },
              });
              return { data: null, error: null };
            } else if (type === "message") {
              return { data: key, error: null };
            }
          } catch (error) {
            return { error: error };
          }
        },
        async onQueryStarted(
          data,
          {
            dispatch,
            getState,
            extra,
            requestId,
            queryFulfilled,
            getCacheEntry,
          }
        ) {
          const user = userApi.endpoints.getUser.select()(getState()).data;
          try {
            await queryFulfilled;
            if (
              data.type === "userThumbnail" ||
              data.type === "userCoverPhoto"
            ) {
              dispatch(
                userApi.util.invalidateTags([{ type: "user", id: data.id }])
              );
            } else if (data.type === "room") {
              dispatch(
                chatRoomApi.util.invalidateTags([
                  { type: "room", id: data.id },
                  { type: "userRooms", id: user._id },
                ])
              );
            } else if (data.type === "post") {
              dispatch(
                postApi.util.invalidateTags([{ type: "posts", id: "posts" }])
              );
            } else if (data.type === "comment") {
              dispatch(
                commentApi.util.invalidateTags([
                  { type: "comments", id: "comments" },
                ])
              );
            }
          } catch (error) {
            console.log(error);
          }
        },
      }),
    };
  },
});

export const { useUploadImgMutation } = uploadApi;
export { uploadApi };
