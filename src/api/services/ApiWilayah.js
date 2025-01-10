import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ApiWilayah = createApi({
  reducerPath: "ApiWilayah",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/wilayah`,
  }),
  endpoints: (builder) => ({
    provinces: builder.query({
      query: () => `/provinsi`,
    }),
    cities: builder.query({
      query: (id) => `/${id}/kota`,
    }),
    districts: builder.query({
      query: (id) => `/${id}/kecamatan`,
    }),
    villages: builder.query({
      query: (id) => `/${id}/desa`,
    }),
  }),
});

export const {
  useProvincesQuery,
  useCitiesQuery,
  useDistrictsQuery,
  useVillagesQuery,
} = ApiWilayah;
