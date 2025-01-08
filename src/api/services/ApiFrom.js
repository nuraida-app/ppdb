import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiFrom = createApi({
  reducerPath: "ApiFrom",
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
      query: ({ status, page, limit, search }) => ({
        url: `/proses`,
        params: { status, page, limit, search },
        method: "GET",
      }),
      providesTags: ["forms"],
    }),
    getForm: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["form"],
    }),
    addStudentForm: builder.mutation({
      query: ({ body, userId }) => ({
        url: `/data-diri`,
        method: "POST",
        params: { userId },
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
    addParents: builder.mutation({
      query: ({ body, userId }) => ({
        url: `/orangtua`,
        method: "POST",
        params: { userId },
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
    getFamilyForm: builder.query({
      query: ({ page, limit, search, id }) => ({
        url: `/keluarga/${id}`,
        params: { page, limit, search },
        method: "GET",
      }),
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
      query: (id) => ({
        url: `/hapus-keluarga/${id}`,
        method: "DELETE",
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
  useAddStudentFormMutation,
  useGetAddressFromQuery,
  useAddAddressMutation,
  useAddParentsMutation,
  useGetSchoolFromQuery,
  useAddSchoolMutation,
  useGetFamilyFormQuery,
  useAddFamilyMutation,
  useDeleteFamilyMutation,
  useGetFilesQuery,
  useUploadFilesMutation,
  useDeleteFileMutation,
} = ApiFrom;
