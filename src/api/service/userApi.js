import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/user`,
    credentials: "include",
  }),
  tagTypes: ["users", "user", "admin"],
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: () => `/tampilkan-akun`,
      providesTags: ["users"],
    }),
    getUsers: builder.query({
      query: () => `/tampilkan`,
      providesTags: ["users"],
    }),
    getAdmin: builder.query({
      query: () => `/admin`,
      providesTags: ["admin"],
    }),
    updateAdmin: builder.mutation({
      query: (body) => ({
        url: "/update-admin",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["admin"],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: "/update-user",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["user"],
    }),
    findEmail: builder.mutation({
      query: (email) => ({
        url: `/temukan-email/${email}`,
        method: "GET",
      }),
    }),
    recoverPassword: builder.mutation({
      query: (body) => ({
        url: "/pulihkan-akun",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetUsersQuery,
  useGetAdminQuery,
  useUpdateAdminMutation,
  useUpdateUserMutation,
  useFindEmailMutation,
  useRecoverPasswordMutation,
} = userApi;
