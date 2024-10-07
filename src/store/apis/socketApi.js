import { io } from "socket.io-client";
import { useDetectLogin } from "../../hooks/useDetectLogin";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import useGetLoginInfo from "../../hooks/useGetLoginInfo";
import { userApi } from "./userApi";
import { store } from "..";
import { useSelector } from "react-redux";

export const createSocket = () => {
  let socket;

  return async () => {
    if (!socket) {
      const token = useDetectLogin();
      socket = io(`http://127.0.0.1:8080`, {
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
    baseUrl: "http://127.0.0.1:8080/chat",
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
          socket.disconnect();
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
          } catch (error) {}
        },
      }),
    };
  },
});

export const {
  useGetMessageQuery,
  useSendMessageMutation,
  useGetMoreMessageMutation,
} = socketApi;
export { socketApi };
