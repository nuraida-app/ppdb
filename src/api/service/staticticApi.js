import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const statisticApi = createApi({
  reducerPath: "statisticApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/statistik`,
    credentials: "include",
  }),
  tagTypes: ["demographic", "payments", "dashboard"],
  endpoints: (buidder) => ({
    getDemographic: buidder.query({
      query: () => "/demography",
      providesTags: ["demographic"],
    }),
    getData: buidder.query({
      query: () => "/data-dashboard",
      providesTags: ["dashboard"],
    }),
    getDataPayments: buidder.query({
      query: () => "/pembayaran",
      providesTags: ["payment"],
    }),
  }),
});

export const {
  useGetDemographicQuery,
  useGetDataQuery,
  useGetDataPaymentsQuery,
} = statisticApi;
