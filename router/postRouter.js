import express from "express";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";

const router = express.Router();

router.get("/tampilkan/:kategory", async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM posts WHERE kategori = $1`, [
      req.params.kategory,
    ]);

    const post = data.rows;

    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/tambahkan", isUser, role("admin"), async (req, res) => {
  try {
    const { value, category, id, title } = req.body;

    const data = await client.query(`SELECT * FROM posts WHERE id = $1`, [id]);

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE posts SET teks = $1, judul = $2 WHERE id = $3`,
        [value, title, id]
      );

      res.status(200).json({ message: "Berhasil diperbarui" });
    } else {
      await client.query(
        `INSERT INTO posts(judul, teks, kategori) VALUES($1, $2, $3)
        RETURNING *`,
        [title, value, category]
      );

      res.status(200).json({ message: "Berhasil ditambahkan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", isUser, role("admin"), async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM posts WHERE id = $1`, [
      req.params.id,
    ]);

    const post = data.rows[0];

    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/delete", isUser, role("admin"), async (req, res) => {
  try {
    const { id } = req.body;
    await client.query(`DELETE FROM posts WHERE id = $1`, [id]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
