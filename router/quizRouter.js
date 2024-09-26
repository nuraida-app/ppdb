import express from "express";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";

const router = express.Router();

router.post("/simpan-kuis", isUser, role("admin"), async (req, res) => {
  try {
    const { id, type, question, input } = req.body;

    const data = await client.query(`SELECT * FROM kuis WHERE id = $1`, [id]);

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE kuis SET jenis = $1, soal = $2, pengisi = $3 WHERE id = $4`,
        [type, question, input, id]
      );

      res.status(200).json({ message: "Berhasil diperbarui" });
    } else {
      await client.query(
        `INSERT INTO kuis(jenis, soal, pengisi) VALUES ($1, $2, $3)`,
        [type, question, input]
      );

      res.status(200).json({ message: "Berhasil disimpan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/tampilkan-kuis",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const data = await client.query(`SELECT * FROM kuis ORDER BY id DESC`);

      res.status(200).json(data.rows);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/kuis/:id", isUser, role("admin", "user"), async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM kuis WHERE id = $1`, [
      req.params.id,
    ]);

    res.status(200).json(data.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/hapus-kuis/:id", isUser, role("admin"), async (req, res) => {
  try {
    await client.query(`DELETE FROM kuis WHERE id = $1`, [req.params.id]);

    res.status(200).json({ message: "Pertanyaan Berhasil Dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Jawaban
router.post("/simpan-jawaban", isUser, role("user"), async (req, res) => {
  try {
    const { userId, quizId, answer } = req.body;

    const data = await client.query(
      `SELECT * FROM jawaban WHERE 
     user_id =$1 AND soal_id = $2`,
      [userId, quizId]
    );

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE jawaban SET jawaban = $1
          WHERE user_id =$2 AND soal_id = $3`,
        [answer, userId, quizId]
      );

      res.status(200).json({ message: "Berhasil disimpan" });
    } else {
      await client.query(
        `INSERT INTO jawaban(user_id, soal_id, jawaban)
        VALUES($1, $2, $3)`,
        [userId, quizId, answer]
      );

      res.status(200).json({ message: "Berhasil disimpan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/jawaban/:userId",
  isUser,
  role("user", "admin"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT * FROM jawaban WHERE user_id = $1`,
        [req.params.userId]
      );

      res.status(200).json(data.rows);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
