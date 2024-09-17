import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    load: builder.mutation({
      query: () => "/load",
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/daftar",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/masuk",
        method: "POST",
        body,
      }),
    }),
    adminLogin: builder.mutation({
      query: (body) => ({
        url: "/masuk-admin",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/keluar",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoadMutation,
  useRegisterMutation,
  useLoginMutation,
  useAdminLoginMutation,
  useLogoutMutation,
} = authApi;
