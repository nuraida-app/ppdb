import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const schoolApi = createApi({
  reducerPath: "schoolApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/sekolah`,
    credentials: "include",
  }),
  tagTypes: ["school", "schools"],
  endpoints: (builder) => ({
    getSchools: builder.query({
      query: () => "/tampilkan",
      providesTags: ["schools"],
    }),
    getSchool: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["school"],
    }),
    addSchool: builder.mutation({
      query: (body) => ({
        url: "/tambah",
        method: "POST",
        body,
      }),
      invalidatesTags: ["schools", "school"],
    }),
    deleteSchool: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["schools"],
    }),
  }),
});

export const {
  useGetSchoolsQuery,
  useGetSchoolQuery,
  useAddSchoolMutation,
  useDeleteSchoolMutation,
} = schoolApi;
