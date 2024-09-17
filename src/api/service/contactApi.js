import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/narahubung`,
    credentials: "include",
  }),
  tagTypes: ["contact", "contacts"],
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => "/tampilkan",
      providesTags: ["contacts"],
    }),
    getContact: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["contact"],
    }),
    addContact: builder.mutation({
      query: (body) => ({
        url: `/tambahkan`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["contacts", "contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contacts"],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useGetContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactApi;
