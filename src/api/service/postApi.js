import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/post`,
    credentials: "include",
  }),
  tagTypes: ["post", "posts"],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: `/tampilkan`,
        method: "GET",
      }),
      providesTags: ["posts"],
    }),
    getPost: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: `/tambahkan`,
        method: "POST",
        body,
      }),
      invalidatesTags: ({ category, id }) => [
        { type: "posts", category },
        { type: "post", id },
      ],
    }),
    deletePost: builder.mutation({
      query: (body) => ({
        url: `/delete`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ({ category, id }) => [
        { type: "posts", category },
        { type: "post", id },
      ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useDeletePostMutation,
} = postApi;
