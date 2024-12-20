import express from "express";
import { client } from "../config/config.js";
import { authorize } from "../middleware/authorize.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.get("/get", authorize("admin"), async (req, res) => {
  try {
    // Ambil query parameter `page` dan `limit` dari permintaan
    const page = parseInt(req.query.page, 10) || 1; // Halaman default 1
    const limit = parseInt(req.query.limit, 10) || 10; // Batas default 10
    const search = req.query.search;

    // Hitung offset untuk query SQL
    const offset = (page - 1) * limit;

    let users = [];
    let totalPages;

    if (search) {
      // Dapatkan total jumlah data untuk menghitung total halaman
      const totalCountResult = await client.query(
        `SELECT COUNT(*) FROM user_info 
        WHERE LOWER(nama) LIKE LOWER($1) 
        OR LOWER(email) LIKE LOWER($1)`,
        ["%" + search + "%"]
      );
      const totalCount = parseInt(totalCountResult.rows[0].count, 10);

      totalPages = Math.ceil(totalCount / limit);

      // Ambil data berdasarkan halaman dan batas
      const dataResult = await client.query(
        `SELECT * FROM user_info WHERE LOWER(nama) LIKE LOWER($1) 
        OR LOWER(email) LIKE LOWER($1) 
        ORDER BY nama ASC LIMIT $2 OFFSET $3`,
        ["%" + search + "%", limit, offset]
      );

      users = dataResult.rows;
    } else {
      // Dapatkan total jumlah data untuk menghitung total halaman
      const totalCountResult = await client.query(
        "SELECT COUNT(*) FROM user_info"
      );
      const totalCount = parseInt(totalCountResult.rows[0].count, 10);

      totalPages = Math.ceil(totalCount / limit);

      // Ambil data berdasarkan halaman dan batas
      const dataResult = await client.query(
        "SELECT * FROM user_info ORDER BY id LIMIT $1 OFFSET $2",
        [limit, offset]
      );

      users = dataResult.rows;
    }

    // Kembalikan data dan metadata paginasi
    res.json({
      users,
      totalPages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

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

router.put("/update-user", authorize("user"), async (req, res) => {
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

router.get("/tampilkan", authorize("admin"), async (req, res) => {
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

// Recovery
router.get("/temukan-email/:email", async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM "user" WHERE email = $1`, [
      req.params.email,
    ]);

    if (data.rowCount > 0) {
      const user = data.rows[0];

      res.status(200).json({ user, message: "Email ditemukan" });
    } else {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/pulihkan-akun", async (req, res) => {
  try {
    const { email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    await client.query(
      `UPDATE "user" SET password = $1
        WHERE email = $2`,
      [hash, email]
    );

    res.status(200).json({ message: "Password password berhasil diperbarui" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Tampilkan user
router.get("/tampilkan-akun", authorize("admin"), async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM "user"`);

    const users = data.rows;

    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
