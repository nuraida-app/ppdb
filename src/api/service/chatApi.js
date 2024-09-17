import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/pesan`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getChatsHistory: builder.query({
      query: (id) => `/riwayat/${id}`,
    }),
  }),
});

export const { useGetChatsHistoryQuery } = chatApi;
