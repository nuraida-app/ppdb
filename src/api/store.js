import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/Authorize";
import { ApiUsers } from "./services/ApiUsers";
import { ApiPembayaran } from "./services/ApiPembayaran";
import { ApiStatistik } from "./services/ApiStatistik";
import { ApiAuthorize } from "./services/ApiAuthorize";
import { ApiTapel } from "./services/ApiTapel";
import { ApiSekolah } from "./services/ApiSekolah";
import { ApiJenjang } from "./services/ApiJenjang";
import { ApiInfo } from "./services/ApiInfo";
import { ApiJadwal } from "./services/ApiJadwal";
import { ApiKuis } from "./services/ApiKuis";
import { ApiFrom } from "./services/ApiFrom";
import { ApiWilayah } from "./services/ApiWilayah";

const store = configureStore({
  reducer: {
    user: userReduser,
    [ApiUsers.reducerPath]: ApiUsers.reducer,
    [ApiAuthorize.reducerPath]: ApiAuthorize.reducer,
    [ApiPembayaran.reducerPath]: ApiPembayaran.reducer,
    [ApiTapel.reducerPath]: ApiTapel.reducer,
    [ApiSekolah.reducerPath]: ApiSekolah.reducer,
    [ApiJenjang.reducerPath]: ApiJenjang.reducer,
    [ApiInfo.reducerPath]: ApiInfo.reducer,
    [ApiJadwal.reducerPath]: ApiJadwal.reducer,
    [ApiKuis.reducerPath]: ApiKuis.reducer,
    [ApiFrom.reducerPath]: ApiFrom.reducer,
    [ApiWilayah.reducerPath]: ApiWilayah.reducer,
    [ApiStatistik.reducerPath]: ApiStatistik.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      ApiUsers.middleware,
      ApiAuthorize.middleware,
      ApiPembayaran.middleware,
      ApiTapel.middleware,
      ApiSekolah.middleware,
      ApiJenjang.middleware,
      ApiInfo.middleware,
      ApiJadwal.middleware,
      ApiKuis.middleware,
      ApiFrom.middleware,
      ApiWilayah.middleware,
      ApiStatistik.middleware,
    ]),
});

export default store;
