import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const chatRoomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/room",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.userToken;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
        return headers;
      }
    },
  }),
  endpoints(builder) {
    return {
      getRooms: builder.query({
        query: (userId) => {
          return {
            url: "/",
            method: "GET",
            params: { userId },
          };
        },
      }),
    };
  },
});
export const { useGetRoomsQuery } = chatRoomApi;
export { chatRoomApi };
