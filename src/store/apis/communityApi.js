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
        query: () => {
          return {
            url: "/",
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useGetCommunitiesQuery } = CommunityApi;
export default CommunityApi;
