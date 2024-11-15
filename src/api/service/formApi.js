import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const formApi = createApi({
  reducerPath: "formApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/formulir`,
    credentials: "include",
  }),
  tagTypes: [
    "student",
    "address",
    "parents",
    "school",
    "notes",
    "files",
    "family",
    "form",
    "forms",
  ],
  endpoints: (builder) => ({
    waited: builder.mutation({
      query: (userId) => ({
        url: `/menunggu/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["form", "forms"],
    }),
    accepted: builder.mutation({
      query: (userId) => ({
        url: `/diterima/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["form", "forms"],
    }),
    rejected: builder.mutation({
      query: (userId) => ({
        url: `/ditolak/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["form", "forms"],
    }),
    getForms: builder.query({
      query: () => "/tampilkan",
      providesTags: ["forms"],
    }),
    getForm: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["form"],
    }),
    getStudentFrom: builder.query({
      query: (userId) => `/data-diri/${userId}`,
      providesTags: ["student"],
    }),
    addStudentForm: builder.mutation({
      query: (body) => ({
        url: `/data-diri`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["student", "form"],
    }),
    getAddressFrom: builder.query({
      query: (userId) => `/alamat/${userId}`,
      providesTags: ["address"],
    }),
    addAddress: builder.mutation({
      query: (body) => ({
        url: `/alamat`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["address", "form"],
    }),
    getParentsForm: builder.query({
      query: (userId) => `/orangtua/${userId}`,
      providesTags: ["parents"],
    }),
    addPratents: builder.mutation({
      query: (body) => ({
        url: `/orangtua`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["parents", "form"],
    }),
    getSchoolFrom: builder.query({
      query: (userId) => `/asal-sekolah/${userId}`,
      providesTags: ["school"],
    }),
    addSchool: builder.mutation({
      query: (body) => ({
        url: "/asal-sekolah",
        method: "POST",
        body,
      }),
      invalidatesTags: ["school", "form"],
    }),
    getHealtForm: builder.query({
      query: (userId) => `/kesehatan/${userId}`,
      providesTags: ["notes"],
    }),
    addHealth: builder.mutation({
      query: (body) => ({
        url: "/kesehatan",
        method: "POST",
        body,
      }),
      invalidatesTags: ["notes", "form"],
    }),
    deleteHealth: builder.mutation({
      query: (body) => ({
        url: "/hapus-kesehatan",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["notes", "form"],
    }),
    getFamilyForm: builder.query({
      query: (userId) => `/keluarga/${userId}`,
      providesTags: ["family"],
    }),
    addFamily: builder.mutation({
      query: (body) => ({
        url: "/keluarga",
        method: "POST",
        body,
      }),
      invalidatesTags: ["family", "form"],
    }),
    deleteFamily: builder.mutation({
      query: (body) => ({
        url: "/hapus-keluarga",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["family", "form"],
    }),
    getFiles: builder.query({
      query: (userId) => `/berkas/${userId}`,
      providesTags: ["files"],
    }),
    uploadFiles: builder.mutation({
      query: (body) => ({
        url: "/upload-berkas",
        method: "POST",
        body,
      }),
      invalidatesTags: ["files", "form"],
    }),
    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/hapus-berkas/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["files", "form"],
    }),
  }),
});

export const {
  useWaitedMutation,
  useAcceptedMutation,
  useRejectedMutation,
  useGetFormsQuery,
  useGetFormQuery,
  useGetStudentFromQuery,
  useAddStudentFormMutation,
  useGetAddressFromQuery,
  useAddAddressMutation,
  useGetParentsFormQuery,
  useAddPratentsMutation,
  useGetSchoolFromQuery,
  useAddSchoolMutation,
  useGetHealtFormQuery,
  useAddHealthMutation,
  useDeleteHealthMutation,
  useGetFamilyFormQuery,
  useAddFamilyMutation,
  useDeleteFamilyMutation,
  useGetFilesQuery,
  useUploadFilesMutation,
  useDeleteFileMutation,
} = formApi;
