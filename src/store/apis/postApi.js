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
        merge: (currentCacheData, newItems) => {
          currentCacheData.push(...newItems);
        },
        forceRefetch({ currentArg, previousArg }) {
          return currentArg !== previousArg;
        },
      }),
      getSinglePost: builder.query({
        query: (_id) => {
          return {
            url: `/${_id}`,
            method: "GET",
          };
        },
      }),
      addPost: builder.mutation({
        invalidatesTags: [{ type: "posts", id: "posts" }],
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
    };
  },
});

export const { useGetPostsQuery, useAddPostMutation, useGetSinglePostQuery } =
  postApi;
export default postApi;
