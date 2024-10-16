import "dotenv/config";
import app from "./app.js";
import { client, connect } from "./config/database.js";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      process.env.DOMAIN_1,
      process.env.DOMAIN_2,
      process.env.DOMAIN_3,
      process.env.DOMAIN_4,
      process.env.DOMAIN_5,
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("message", async (message) => {
    const chat = await client.query(
      `INSERT INTO pesan(
      pengirim_id, pengirim, pengirim_role, penerima_id, penerima,
      penerima_role, teks) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        message.sender_id,
        message.sender,
        message.sender_role,
        message.recipient_id,
        message.recipient,
        message.recipient_role,
        message.chat,
      ]
    );

    io.emit("message", chat);
  });

  socket.on("disconnect", () => {
    console.log("disconnect");
  });
});

app.get("/", (req, res) => {
  res.redirect(process.env.DOMAIN_1);
});

server.listen(process.env.PORT, async (req, res) => {
  try {
    await connect();

    console.log(`port: ${process.env.PORT}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
});
