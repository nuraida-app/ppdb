import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const areaApi = createApi({
  reducerPath: "areaApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API}/wilayah`,
    credentials: "include",
  }),
  tagTypes: ["provinsi", "regional", "kecamatan", "desa"],
  endpoints: (builder) => ({
    getProvinces: builder.query({
      query: () => `/provinsi`,
      providesTags: ["provinsi"],
    }),
    getRegencies: builder.query({
      query: (provinceId) => `/regional/${provinceId}`,
      providesTags: ["regional"],
    }),
    getDistricts: builder.query({
      query: (regionalId) => `/kecamatan/${regionalId}`,
      providesTags: ["kecamatan"],
    }),
    getVillages: builder.query({
      query: (districtId) => `/desa/${districtId}`,
      providesTags: ["desa"],
    }),
  }),
});

export const {
  useGetProvincesQuery,
  useGetRegenciesQuery,
  useGetDistrictsQuery,
  useGetVillagesQuery,
} = areaApi;
