import express from "express";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";

const router = express.Router();

router.get("/tampilkan", async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM narahubung`);

    const contacts = data.rows;

    res.status(200).json(contacts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/tambahkan", isUser, role("admin"), async (req, res) => {
  try {
    const { id, name, phone } = req.body;

    const data = await client.query(
      `SELECT * FROM narahubung
        WHERE id = $1`,
      [id]
    );

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE narahubung SET nama = $1, tlp = $2 RETURNING *`,
        [name, phone]
      );

      return res.status(200).json({ message: "Data berhasil diperbarui" });
    } else {
      await client.query(`INSERT INTO narahubung(nama, tlp) VALUES($1, $2)`, [
        name,
        phone,
      ]);

      return res.status(200).json({ message: "Data berhasil disimpan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", isUser, role("admin"), async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM narahubung WHERE id = $1`, [
      req.params.id,
    ]);

    const contact = data.rows[0];

    res.status(200).json(contact);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", isUser, role("admin"), async (req, res) => {
  try {
    await client.query(`DELETE FROM narahubung WHERE id =$1`, [req.params.id]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
