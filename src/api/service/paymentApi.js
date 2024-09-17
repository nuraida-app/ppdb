import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "pamentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/pembayaran`,
    credentials: "include",
  }),
  tagTypes: ["myPayment", "payments"],
  endpoints: (builder) => ({
    getPayments: builder.query({
      query: () => "/semua-pembayaran",
      providesTags: ["payments"],
    }),
    confirmPayment: builder.mutation({
      query: (userId) => ({
        url: `/konfirmasi-pembayaran/${userId}`,
        method: "PUT",
      }),
      invalidatesTags: ["payments"],
    }),
    myPayment: builder.query({
      query: (id) => `/${id}`,
      providesTags: (id) => [{ type: "myPayment", id }],
    }),
    uploadPayment: builder.mutation({
      query: (body) => ({
        url: "/upload-berkas",
        method: "POST",
        body,
      }),
      invalidatesTags: ({ id }) => [{ type: "myPayment", id }],
    }),
  }),
});
export const {
  useGetPaymentsQuery,
  useConfirmPaymentMutation,
  useMyPaymentQuery,
  useUploadPaymentMutation,
} = paymentApi;
