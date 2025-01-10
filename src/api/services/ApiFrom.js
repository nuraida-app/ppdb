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
    changeStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/ubah-status`,
        params: { id, status },
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
    addSchool: builder.mutation({
      query: (body) => ({
        url: "/asal-sekolah",
        method: "POST",
        body,
      }),
      invalidatesTags: ["school", "form"],
    }),
    getFamilyForm: builder.query({
      query: (id) => ({
        url: `/keluarga/${id}`,
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
    uploadFile: builder.mutation({
      query: (body) => ({
        url: "/berkas",
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
  useChangeStatusMutation,
  useGetFormsQuery,
  useGetFormQuery,
  useAddStudentFormMutation,
  useAddAddressMutation,
  useAddParentsMutation,
  useAddSchoolMutation,
  useGetFamilyFormQuery,
  useAddFamilyMutation,
  useDeleteFamilyMutation,
  useGetFilesQuery,
  useUploadFileMutation,
  useDeleteFileMutation,
} = ApiFrom;
