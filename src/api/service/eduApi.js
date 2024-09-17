import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eduApi = createApi({
  reducerPath: "eduApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/pendidikan`,
    credentials: "include",
  }),
  tagTypes: ["education", "educations"],
  endpoints: (builder) => ({
    getEducations: builder.query({
      query: () => "/tampilkan",
      providesTags: ["educations"],
    }),
    getEducation: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["education"],
    }),
    addEducation: builder.mutation({
      query: (body) => ({
        url: "/tambah",
        method: "POST",
        body,
      }),
      invalidatesTags: ["educations", "education"],
    }),
    deleteEdu: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["educations"],
    }),
  }),
});

export const {
  useGetEducationsQuery,
  useGetEducationQuery,
  useAddEducationMutation,
  useDeleteEduMutation,
} = eduApi;
