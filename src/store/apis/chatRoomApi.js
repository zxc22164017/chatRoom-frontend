import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { useDetectLogin } from "../../hooks/useDetectLogin";

const chatRoomApi = createApi({
  reducerPath: "roomApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/room",
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
      getRooms: builder.query({
        providesTags: (result, error, userId) => {
          return [{ type: "userRooms", id: userId }];
        },
        query: (userId) => {
          return {
            url: "/",
            method: "GET",
            params: { userId },
          };
        },
      }),
      getSingleRoom: builder.query({
        providesTags: (result, error, roomId) => {
          return [{ type: "room", id: roomId }];
        },
        query: (roomId) => {
          return {
            url: `/${roomId}`,
            method: "GET",
          };
        },
      }),
      addRoom: builder.mutation({
        invalidatesTags: (result, error, { users }) => {
          return [{ type: "userRooms", id: users[users.length - 1] }];
        },
        query: ({ name, users }) => {
          return {
            url: `/`,
            method: "POST",
            body: {
              name,
              users,
            },
          };
        },
      }),
      patchRoom: builder.mutation({
        invalidatesTags: (result, error, { roomId }) => {
          return [{ type: "room", id: roomId }];
        },
        query: ({ name, users, roomId, image }) => {
          return {
            url: `/${roomId}`,
            method: "PATCH",
            body: {
              name,
              users,
              image,
            },
          };
        },
      }),
    };
  },
});

//dev for testing loading
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const {
  useGetRoomsQuery,
  useGetSingleRoomQuery,
  useAddRoomMutation,
  usePatchRoomMutation,
} = chatRoomApi;
export { chatRoomApi };
