import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { useDetectLogin } from "../../hooks/useDetectLogin";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8080/user",
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
      signupUser: builder.mutation({
        query: (formData) => {
          return {
            url: "/signup",
            method: "POST",
            body: {
              username: formData.username,
              email: formData.email,
              password: formData.password,
              birthday: formData.birthday,
              gender: formData.gender,
            },
          };
        },
      }),
      signinUser: builder.mutation({
        query: (formData) => {
          return {
            url: "/signin",
            method: "POST",
            body: {
              email: formData.email,
              password: formData.password,
            },
          };
        },
      }),
      logout: builder.mutation({
        query: (_id) => {
          return {
            url: "/logout",
            method: "PATCH",
            body: {
              _id,
            },
          };
        },
      }),
      getUser: builder.query({
        providesTags: (result, error) => {
          return [{ type: "user", id: result._id }];
        },
        query: () => {
          return {
            url: "/",

            method: "GET",
          };
        },
      }),
      searchUsers: builder.mutation({
        query: ({ search }) => {
          return {
            url: "/search",
            params: { search },
            method: "GET",
          };
        },
      }),
      getProfileInfo: builder.query({
        providesTags: (result, error, _id) => {
          return [{ type: "user", id: _id }];
        },
        query: (_id) => {
          return {
            url: `/${_id}`,
            method: "GET",
          };
        },
      }),
      addFriend: builder.mutation({
        invalidatesTags: (result, error, { user01Id, user02Id }) => {
          return [
            { type: "user", id: user01Id },
            { type: "user", id: user02Id },
          ];
        },
        query: ({ user01Id, user02Id }) => {
          return {
            url: "/friend",
            body: {
              user01Id: user01Id,
              user02Id: user02Id,
            },
            method: "PATCH",
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
  useLogoutMutation,
  useAddFriendMutation,
  useSignupUserMutation,
  useSigninUserMutation,
  useGetUserQuery,
  useSearchUsersMutation,
  useGetProfileInfoQuery,
} = userApi;

export { userApi };
