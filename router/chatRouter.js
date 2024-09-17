import express from "express";
import { isUser, role } from "../middlewares/Auth.js";
import { client } from "../config/database.js";

const router = express.Router();

router.get(
  "/riwayat/:user_id",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT * FROM pesan WHERE pengirim_id = $1 
        OR penerima_id = $2 ORDER BY created_at ASC`,
        [req.params.user_id, req.params.user_id]
      );

      const riwayat = data.rows;

      res.status(200).json(riwayat);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
