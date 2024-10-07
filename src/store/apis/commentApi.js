import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

import { useDetectLogin } from "../../hooks/useDetectLogin";

const commentApi = createApi({
  reducerPath: "comment",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/comment",
    fetchFn: async (...args) => {
      // await pause(10000);
      return fetch(...args);
    },
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
      getComment: builder.query({
        providesTags: (result, error, { postId }) => {
          const tags = result.map((item) => {
            return [{ type: "comment", id: item._id }];
          });
          tags.push({ type: "comments", id: "comments" });
          return tags;
        },
        query: ({ postId, page }) => {
          return {
            url: `/${postId}`,
            method: "GET",
            params: { page },
          };
        },
        serializeQueryArgs({ endpointName }) {
          return endpointName;
        },
        merge: (currentCacheData, newItems, { arg }) => {
          if (arg.page === 0) {
            return newItems;
          }
          currentCacheData.push(...newItems);
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),

      addComment: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "comments", id: "comments" }];
        },
        query: ({ postId, formData }) => {
          return {
            url: `/${postId}`,
            method: "POST",
            body: {
              content: formData,
            },
          };
        },
      }),
      likeComment: builder.mutation({
        invalidatesTags: (result, error) => {
          return [{ type: "comments", id: "comments" }];
        },
        query: (commentId) => {
          return {
            url: `/like/${commentId}`,
            method: "PATCH",
          };
        },
      }),
    };
  },
});

export const {
  useGetCommentQuery,
  useAddCommentMutation,

  useLikeCommentMutation,
} = commentApi;
export default commentApi;
