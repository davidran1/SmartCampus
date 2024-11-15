import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://smart-campus-backend-4hd6.onrender.com";

export const userDataApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
    responseHandler: async (response) => {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      } else {
        return await response.text();
      }
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (arg) => ({
        url: "/login",
        method: "POST",
        body: { userName: arg.userName, password: arg.password },
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ token, email }) => ({
        url: "/verify-email",
        method: "POST",
        body: { token, email },
      }),
    }),
    getAllUsers: builder.query({
      query: (token) => ({
        url: "api/admin/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getNumberOfUsers: builder.query({
      query: (token) => ({
        url: "api/admin/users/count",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    editUser: builder.mutation({
      query: ({ id, userData, token }) => ({
        url: `api/admin/edit/${id}`,
        method: "PUT",
        body: userData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: ({ id, token }) => ({
        url: `api/admin/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getSensors: builder.query({
      query: (token) => ({
        url: "api/sensorsData/all-data",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useVerifyEmailMutation,
  useGetAllUsersQuery,
  useGetNumberOfUsersQuery,
  useEditUserMutation,
  useDeleteUserMutation,
  useGetSensorsQuery,
} = userDataApi;
