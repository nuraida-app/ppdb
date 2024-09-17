import express from "express";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/buat", isUser, role("admin"), async (req, res) => {
  try {
    const id = 1;
    const { name } = req.body;

    const data = await client.query(`UPDATE app SET nama = $1 WHERE id = $2`, [
      name,
      id,
    ]);

    res.status(200).json({ message: "Berhasil diperbarui" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/tampil", async (req, res) => {
  try {
    const id = 1;

    const data = await client.query(`SELECT * FROM app WHERE id = $1`, [id]);

    const app = data.rows[0];

    res.status(200).json(app);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
