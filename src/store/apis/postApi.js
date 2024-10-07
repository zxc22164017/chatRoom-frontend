import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useDetectLogin } from "../../hooks/useDetectLogin";

const postApi = createApi({
  reducerPath: "post",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/post",
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
      getPosts: builder.query({
        providesTags: (result, error) => {
          const tags = result.map((item) => {
            return [{ type: "post", id: item._id }];
          });
          tags.push({ type: "posts", id: "posts" });
          return tags;
        },
        query: (page) => {
          return {
            url: "/",
            method: "GET",
            params: { page },
          };
        },
        serializeQueryArgs({ endpointName }) {
          return endpointName;
        },
        merge: (currentCacheData, newItems, { arg }) => {
          if (arg === 0) {
            return newItems;
          }
          currentCacheData.push(...newItems);
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),
      getSinglePost: builder.query({
        providesTags: (result, error, _id) => {
          return [{ type: "post", id: _id }];
        },
        query: (_id) => {
          return {
            url: `/${_id}`,
            method: "GET",
          };
        },
      }),
      getUserPosts: builder.query({
        query: ({ userId, page }) => {
          return {
            url: "/user",
            method: "GET",
            params: {
              userId,
              page,
            },
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
      searchPost: builder.mutation({
        query: ({ search, page }) => {
          return {
            url: "/search",
            method: "GET",
            params: {
              search,
              page,
            },
          };
        },
      }),
      addPost: builder.mutation({
        query: ({ title, content, communityId }) => {
          return {
            url: "/",
            method: "POST",
            body: {
              title,
              content,
              communityId,
            },
          };
        },
      }),
      likePost: builder.mutation({
        invalidatesTags: (result, error, postId) => {
          return [
            { type: "post", id: postId },
            { type: "posts", id: "posts" },
          ];
        },
        query: (postId) => {
          return {
            url: `/like/${postId}`,
            method: "PATCH",
          };
        },
      }),
    };
  },
});

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetSinglePostQuery,
  useLikePostMutation,
  useGetUserPostsQuery,
  useSearchPostMutation,
} = postApi;
export default postApi;
