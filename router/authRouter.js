import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";

const router = express.Router();

// Fungsi untuk menghasilkan token JWT
const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT, {
    expiresIn: 43200000,
  });
};

// Daftar (Pendaftaran admin baru)
router.post("/daftar-admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    const role = "admin";
    const user = await client.query(
      `INSERT INTO "admin" (name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *`,
      [name, email, hash, role]
    );

    return res.status(200).json({ message: "Pendaftaran Berhasil" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Daftar (Pendaftaran pengguna baru)
router.post("/daftar", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const data = await client.query(`SELECT * FROM "user" WHERE email = $1`, [
      email,
    ]);

    if (data.rowCount > 0) {
      return res.status(500).json({ message: "Email sudah digunakan" });
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    const role = "user";
    const user = await client.query(
      `INSERT INTO "user" (name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *`,
      [name, email, hash, role]
    );

    const token = generateToken(user.rows[0]);

    // Menyimpan token ke cookie
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 43200000 }) // 12 jam
      .json({ message: "Pendaftaran Berhasil" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Login (Autentikasi admin)
router.post("/masuk-admin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await client.query(`SELECT * FROM admin WHERE email = $1`, [
      email,
    ]);

    if (data.rowCount === 0) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const user = data.rows[0];

    // Verifikasi password
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = generateToken(user);

    // Menyimpan token ke cookie
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 43200000 }) // 12 jam
      .json({ message: "Berhasil masuk" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Login (Autentikasi pengguna)
router.post("/masuk", async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await client.query(`SELECT * FROM "user" WHERE email = $1`, [
      email,
    ]);

    if (data.rowCount === 0) {
      return res.status(404).json({ message: "Email tidak ditemukan" });
    }

    const user = data.rows[0];

    // Verifikasi password
    const result = await bcrypt.compare(password, user.password);

    if (!result) {
      return res.status(401).json({ message: "Password salah" });
    }

    const token = generateToken(user);

    // Menyimpan token ke cookie
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 43200000 }) // 12 jam
      .json({ message: "Berhasil masuk" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Load user data (Memuat data pengguna yang sedang login)
router.get("/load", isUser, role("user", "admin"), async (req, res) => {
  try {
    // Mengirimkan data pengguna dari middleware
    res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Logout (Menghapus token cookie)
router.post("/keluar", (req, res) => {
  // Menghapus token pada cookie dengan mengatur nilai cookie menjadi kosong dan waktu kadaluarsa menjadi 0
  res
    .cookie("token", "", { httpOnly: true, expires: new Date(0) }) // Kadaluarsa segera
    .status(200)
    .json({ message: "Berhasil keluar" });
});

export default router;
