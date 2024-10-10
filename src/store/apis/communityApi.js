import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useDetectLogin } from "../../hooks/useDetectLogin";

const CommunityApi = createApi({
  reducerPath: "community",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/community",
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
      getCommunities: builder.query({
        providesTags: [{ type: "communities", id: "communities" }],
        query: () => {
          return {
            url: "/",
            method: "GET",
          };
        },
      }),
      getSingleCommunity: builder.query({
        providesTags: (result, error, name) => {
          return [{ type: "community", id: result._id }];
        },
        query: (name) => {
          return {
            url: `/${name}`,
            method: "GET",
          };
        },
      }),
      addCommunity: builder.mutation({
        query: ({ formData, icon, banner }) => {
          return {
            url: "/",
            method: "POST",
            body: {
              name: formData.name,
              description: formData.description,
              rules: formData.rules,
              icon,
              banner,
            },
          };
        },
      }),
      patchCommunity: builder.mutation({
        invalidatesTags: (result, error, { communityId }) => {
          return [
            { type: "communities", id: "communities" },
            { type: "community", id: communityId },
          ];
        },
        query: ({ formData, icon, banner, communityId }) => {
          console.log(formData.rules);
          return {
            url: `/${communityId}`,
            method: "PATCH",
            body: {
              name: formData.name,
              description: formData.description,
              rules: formData.rules,
              icon,
              banner,
            },
          };
        },
      }),
    };
  },
});

export const {
  useGetCommunitiesQuery,
  useGetSingleCommunityQuery,
  useAddCommunityMutation,
  usePatchCommunityMutation,
} = CommunityApi;
export default CommunityApi;
