import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiAuthorize = createApi({
  reducerPath: "ApiAuthorize",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/otorisasi`,
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
        url: "/sign-in",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/sign-out",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoadMutation,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = ApiAuthorize;
