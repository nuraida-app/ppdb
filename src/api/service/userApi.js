import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/user`,
    credentials: "include",
  }),
  tagTypes: ["users", "user", "admin"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `/tampilkan`,
      providesTags: ["users"],
    }),
    getAdmin: builder.query({
      query: () => `/admin`,
      providesTags: ["admin"],
    }),
    updateAdmin: builder.mutation({
      query: (body) => ({
        url: "/update-admin",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const { useGetUsersQuery, useGetAdminQuery, useUpdateAdminMutation } =
  userApi;
