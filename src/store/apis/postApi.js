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
          let tags;
          if (result) {
            tags = result?.map((item) => {
              return [{ type: "post", id: item._id }];
            });
            tags.push({ type: "posts", id: "posts" });
          } else {
            tags = [{ type: "posts", id: "posts" }];
          }
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
          if (newItems.length !== 0) {
            currentCacheData.push(...newItems);
          }
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
      getCommunityPosts: builder.query({
        query: (communityId) => {
          return {
            url: "/community",
            method: "GET",
            params: {
              communityId,
              page: 0,
            },
          };
        },
      }),
      getMoreCommunityPosts: builder.mutation({
        query: ({ communityId, page }) => {
          return {
            url: "/community",
            method: "GET",
            params: {
              communityId,
              page,
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
          const { communityId } = data;
          try {
            const result = (await queryFulfilled).data;
            const patchResult = dispatch(
              postApi.util.updateQueryData(
                "getCommunityPosts",
                communityId,
                (draft) => {
                  draft.push(...result);
                }
              )
            );
          } catch (error) {
            return { error };
          }
        },
      }),
      searchPost: builder.query({
        providesTags: [{ type: "search", id: "search" }],
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
      addPost: builder.mutation({
        invalidatesTags: [{ type: "posts", id: "posts" }],
        query: ({ formData, image }) => {
          return {
            url: "/",
            method: "POST",
            body: {
              title: formData.title,
              content: formData.content,
              communityId: formData.communityId,
              image,
            },
          };
        },
      }),
      patchPost: builder.mutation({
        invalidatesTags: (result, error, { postId }) => {
          return [{ type: "post", id: postId }];
        },
        query: ({ formData, postId, image }) => {
          return {
            url: `/${postId}`,
            method: "PATCH",
            body: {
              title: formData.title,
              content: formData.content,
              communityId: formData.communityId,
              image,
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
      deletePost: builder.mutation({
        query: (post) => {
          return {
            url: "/",
            method: "DELETE",
            body: {
              post,
            },
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
  useSearchPostQuery,
  useGetCommunityPostsQuery,
  useGetMoreCommunityPostsMutation,
  usePatchPostMutation,
  useDeletePostMutation,
} = postApi;
export default postApi;
