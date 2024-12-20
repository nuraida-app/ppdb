import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiJenjang = createApi({
  reducerPath: "ApiJenjang",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/jenjang`,
    credentials: "include",
  }),
  tagTypes: ["Level", "Levels"],
  endpoints: (builder) => ({
    getLevels: builder.mutation({
      query: ({ page, limit, search }) => ({
        url: "/get",
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: ["Levels"],
    }),
    getLevel: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Level"],
    }),
    addLevel: builder.mutation({
      query: (body) => ({
        url: "/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Levels", "Level"],
    }),
    delLevel: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Levels"],
    }),
  }),
});

export const {
  useGetLevelsMutation,
  useGetLevelQuery,
  useAddLevelMutation,
  useDelLevelMutation,
} = ApiJenjang;
