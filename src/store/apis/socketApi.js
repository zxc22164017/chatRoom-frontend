import { io } from "socket.io-client";
import { useDetectLogin } from "../../hooks/useDetectLogin";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { userApi } from "./userApi";
import { SERVER } from "../../config";

export const createSocket = () => {
  let socket;

  return async () => {
    if (!socket) {
      const token = useDetectLogin();
      socket = io(`${SERVER}`, {
        extraHeaders: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    if (socket.disconnected) {
      socket.connect();
    }
    return socket;
  };
};

export const socketEmitAsPromise = (socket) => {
  return (roomId, message) => {
    return new Promise((resolve, reject) => {
      socket.emit("sendMessage", roomId, message, (response) => {
        if (response?.status !== 200) {
          reject({ error: response });
        } else {
          resolve({ data: response.newMessage });
        }
      });
    });
  };
};
const getSocket = createSocket();
const socketApi = createApi({
  reducerPath: "socketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${SERVER}/chat`,
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
      getMessage: builder.query({
        providesTags: (result, error, { roomId }) => [
          { type: "chat", id: roomId },
        ],
        query: (roomId) => {
          return {
            url: `/${roomId}?page=0`,
            method: "GET",
          };
        },
        queryFn() {
          return {};
        },
        async onCacheEntryAdded(
          roomId,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
        ) {
          const socket = await getSocket();
          await cacheDataLoaded;
          socket.emit("join-room", roomId);
          const listener = (data) => {
            updateCachedData((currentCacheData) => {
              currentCacheData.push(data);
            });
          };
          socket.on("recieveMessage", listener);
          await cacheEntryRemoved;
          socket.removeListener("recieveMessage", listener);
        },
      }),
      sendMessage: builder.mutation({
        queryFn: async (data) => {
          const socket = await getSocket();
          const { roomId, input } = data;
          return socketEmitAsPromise(socket)(roomId, input);
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
          const { roomId } = data;
          // console.log("socket", data);
          const patchResult = dispatch(
            socketApi.util.updateQueryData("getMessage", roomId, (draft) => {
              draft.push({
                _id: 1,
                message: data.input,
                room: data.roomId,
                readed: false,
                sender: {
                  _id: user._id,
                  username: user.username,
                },
                createTime: "sending",
              });
            })
          );

          try {
            const result = await queryFulfilled;
            // console.log("socket-after ", result);
            dispatch(
              socketApi.util.updateQueryData("getMessage", roomId, (draft) => {
                const index = draft.findIndex((item) => !item._id);
                draft[index] = result.data;
              })
            );
            patchResult.undo();
          } catch (error) {
            console.log(error);
            patchResult.undo();
            dispatch(
              socketApi.util.invalidateTags([{ type: "chat", id: data.roomId }])
            );
          }
        },
      }),
      getMoreMessage: builder.mutation({
        query: ({ roomId, page }) => {
          return {
            url: `/${roomId}`,
            method: "GET",
            params: {
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
          const { roomId } = data;
          try {
            const result = (await queryFulfilled).data;
            const patchResult = dispatch(
              socketApi.util.updateQueryData("getMessage", roomId, (draft) => {
                draft.unshift(...result);
              })
            );
          } catch (error) {
            return { error };
          }
        },
      }),
      getNotification: builder.query({
        queryFn: () => ({ data: [] }),
        async onCacheEntryAdded(
          args,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
        ) {
          const socket = await getSocket();
          const listener = (data) => {
            updateCachedData((currentCacheData) => {
              currentCacheData.unshift(data);
            });
          };
          socket.on("notification", listener);
          await cacheEntryRemoved;
        },
      }),
    };
  },
});

export const {
  useGetMessageQuery,
  useSendMessageMutation,
  useGetMoreMessageMutation,
  useGetNotificationQuery,
} = socketApi;
export { socketApi };
