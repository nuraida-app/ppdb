import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

import appRouter from "./router/appRouter.js";
import authRouter from "./router/authRouter.js";
import userRouter from "./router/userRouter.js";
import paymentRouter from "./router/paymentRouter.js";
import yearRouter from "./router/yearRouter.js";
import eduRouter from "./router/eduRouter.js";
import schoolRouter from "./router/schoolRouter.js";
import postRouter from "./router/postRouter.js";
import contactRouter from "./router/contactRouter.js";
import areaRouter from "./router/areaRouter.js";
import formRouter from "./router/formRouter.js";
import statisticRouter from "./router/statisticRouter.js";
import scheduleRouter from "./router/scheduleRouter.js";
import quizRouter from "./router/quizRouter.js";

app.use(
  cors({
    origin: [
      process.env.DOMAIN_1,
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

app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/aplikasi", appRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/pembayaran", paymentRouter);
app.use("/tapel", yearRouter);
app.use("/pendidikan", eduRouter);
app.use("/sekolah", schoolRouter);
app.use("/post", postRouter);
app.use("/narahubung", contactRouter);
app.use("/wilayah", areaRouter);
app.use("/formulir", formRouter);
app.use("/statistik", statisticRouter);
app.use("/jadwal", scheduleRouter);
app.use("/kuis", quizRouter);

export default app;
