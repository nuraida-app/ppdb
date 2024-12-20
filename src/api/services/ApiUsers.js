import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiUsers = createApi({
  reducerPath: "ApiUsers",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/users`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: ({ page, limit, search }) => ({
        url: `/get`,
        params: { page, limit, search },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUsersMutation } = ApiUsers;
