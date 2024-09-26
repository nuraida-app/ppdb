import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const quizApi = createApi({
  reducerPath: "quizApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/kuis`,
    credentials: "include",
  }),
  tagTypes: ["quiz", "quizzes", "answers"],
  endpoints: (builder) => ({
    getQuizzes: builder.query({
      query: () => "/tampilkan-kuis",
      providesTags: ["Quizzes"],
    }),
    getQuiz: builder.query({
      query: (id) => `/kuis/${id}`,
      providesTags: ["Quiz"],
    }),
    addQuiz: builder.mutation({
      query: (body) => ({
        url: `/simpan-kuis`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Quizzes"],
    }),
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/hapus-kuis/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quizzes"],
    }),
    getAnswer: builder.query({
      query: (id) => `/jawaban/${id}`,
      providesTags: ["answers"],
    }),
    createAnswer: builder.mutation({
      query: (body) => ({
        url: "/simpan-jawaban",
        method: "POST",
        body,
      }),
      invalidatesTags: ["answers"],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizQuery,
  useAddQuizMutation,
  useDeleteQuizMutation,
  useGetAnswerQuery,
  useCreateAnswerMutation,
} = quizApi;
