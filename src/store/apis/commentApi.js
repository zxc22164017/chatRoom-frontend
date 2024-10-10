import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApi } from "./userApi";

import { useDetectLogin } from "../../hooks/useDetectLogin";
import postApi from "./postApi";

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
          let tags;
          if (result) {
            tags = result.map((item) => {
              return [{ type: "comment", id: item._id }];
            });
            tags.push({ type: "comments", id: "comments" });
          } else {
            tags = [{ type: "comments", id: "comments" }];
          }
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
        query: ({ postId, formData, image }) => {
          return {
            url: `/${postId}`,
            method: "POST",
            body: {
              content: formData,
              image,
            },
          };
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
          const { postId } = data;
          try {
            await queryFulfilled;
            dispatch(
              postApi.util.invalidateTags([{ type: "post", id: postId }])
            );
          } catch (error) {
            return { error: error };
          }
        },
      }),
      likeComment: builder.mutation({
        invalidatesTags: [{ type: "comments", id: "comments" }],
        query: (commentId) => {
          return {
            url: `/like/${commentId}`,
            method: "PATCH",
          };
        },
      }),
      patchComment: builder.mutation({
        invalidatesTags: [{ type: "comments", id: "comments" }],
        query: ({ formData, commentId, image }) => {
          return {
            url: `/${commentId}`,
            method: "PATCH",
            body: {
              content: formData,
              image,
            },
          };
        },
      }),
    };
  },
});

export const {
  useGetCommentQuery,
  useAddCommentMutation,
  usePatchCommentMutation,
  useLikeCommentMutation,
} = commentApi;
export default commentApi;
