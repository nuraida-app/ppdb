import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const scheduleApi = createApi({
  reducerPath: "scheduleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/jadwal`,
    credentials: "include",
  }),
  tagTypes: ["schedule", "schedules", "userSchedule"],
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: () => "/tampilkan-data",
      providesTags: ["schedules"],
    }),
    getSchedule: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["schedule"],
    }),
    addSchedule: builder.mutation({
      query: (body) => ({
        url: `/simpan`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["schedules"],
    }),
    deleteSchedule: builder.mutation({
      query: (id) => ({
        url: `/hapus/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["schedules"],
    }),
    getUserSchedule: builder.query({
      query: (id) => `/tampilkan-jadwal/${id}`,
      providesTags: ["userSchedule"],
    }),
    addUserShcedule: builder.mutation({
      query: (body) => ({
        url: `/simpan-jadwal-user`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["userSchedule"],
    }),
    delUserSchedule: builder.mutation({
      query: (body) => ({
        url: `/hapus-jadwal-user/`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["userSchedule"],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useGetScheduleQuery,
  useAddScheduleMutation,
  useDeleteScheduleMutation,
  useGetUserScheduleQuery,
  useAddUserShceduleMutation,
  useDelUserScheduleMutation,
} = scheduleApi;
