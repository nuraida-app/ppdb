import express from "express";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/admin", async (req, res) => {
  try {
    const id = 1;

    const data = await client.query(
      `SELECT id, name, role, email FROM admin WHERE id = $1`,
      [id]
    );

    const admin = data.rows[0];

    res.status(200).json(admin);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/update-user", isUser, role("user"), async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const id = req.user.id;

    if (password) {
      const hash = await bcrypt.hash(password, 10);

      await client.query(
        `UPDATE "user" SET name = $1, email = $2, password = $3, phone = $4
        WHERE id = $5`,
        [name, email, hash, phone, id]
      );
    } else {
      await client.query(
        `UPDATE "user" SET name = $1, email = $2, phone = $3
        WHERE id = $4`,
        [name, email, phone, id]
      );
    }

    res.status(200).json({ message: "Data berhasil diperbarui" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/tampilkan", isUser, role("admin"), async (req, res) => {
  try {
    const data = await client.query(`
      SELECT 
        "user".id, 
        "user".name, 
        "user".role, 
        "user".email, 
        pendaftar.berkas
      FROM "user"
      INNER JOIN pendaftar 
      ON pendaftar.userid = "user".id
    `);

    // Mapping hasil query ke array `users`
    const users = data.rows.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      berkas: user.berkas,
    }));

    res.status(200).json(users); // Kembalikan array `users`
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
