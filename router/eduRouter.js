import express from "express";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";

const router = express.Router();

router.get("/tampilkan", async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM jenjang`);

    const educations = data.rows;

    res.status(200).json(educations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/tambah", isUser, role("admin"), async (req, res) => {
  try {
    const { name, id } = req.body;

    const data = await client.query(`SELECT * FROM jenjang WHERE id = $1`, [
      id,
    ]);

    if (data.rowCount > 0) {
      await client.query(`UPDATE jenjang SET nama = $1 WHERE id = $2`, [
        name,
        id,
      ]);

      return res.status(200).json({ message: "Berhasil diperbarui" });
    } else {
      await client.query(`INSERT INTO jenjang(nama) VALUES($1)`, [name]);

      res.status(200).json({ message: "Berhasil ditambahkan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", isUser, role("admin"), async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM jenjang WHERE id = $1`, [
      req.params.id,
    ]);

    const education = data.rows[0];

    res.status(200).json(education);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", isUser, role("admin"), async (req, res) => {
  try {
    await client.query(`DELETE FROM jenjang WHERE id = $1`, [req.params.id]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
