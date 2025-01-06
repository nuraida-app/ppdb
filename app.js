import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

import RouterUsers from "./router/user.js";
import RouterAuth from "./router/auth.js";
import RouterPembayaran from "./router/pembayaran.js";
import RouterTapel from "./router/Tapel.js";
import RouterSekolah from "./router/sekolah.js";
import RouterJenjang from "./router/jenjang.js";
import RouterInfo from "./router/info.js";
import RouterJadwal from "./router/jadwal.js";
import RouterStatistik from "./router/statistik.js";
import RouterKuis from "./router/kuisioner.js";

app.use(
  cors({
    origin: [
      process.env.DOMAIN,
      process.env.DOMAIN_2,
      process.env.DOMAIN_3,
      process.env.DOMAIN_4,
      process.env.DOMAIN_5,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", RouterUsers);
app.use("/otorisasi", RouterAuth);
app.use("/pembayaran", RouterPembayaran);
app.use("/tapel", RouterTapel);
app.use("/sekolah", RouterSekolah);
app.use("/jenjang", RouterJenjang);
app.use("/info", RouterInfo);
app.use("/jadwal", RouterJadwal);
app.use("/kuis", RouterKuis);
app.use("/statistik", RouterStatistik);

export default app;
