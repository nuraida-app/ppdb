import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/aplikasi`,
    credentials: "include",
  }),
  tagTypes: ["app"],
  endpoints: (builder) => ({
    addAppName: builder.mutation({
      query: (body) => ({
        url: "/buat",
        method: "POST",
        body,
      }),
      invalidatesTags: ["app"],
    }),
    getApp: builder.query({
      query: () => `/tampil`,
      providesTags: ["app"],
    }),
  }),
});

export const { useAddAppNameMutation, useGetAppQuery } = appApi;
