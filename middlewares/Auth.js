import jwt from "jsonwebtoken";
import { client } from "../config/database.js";

export const isUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ message: "Silahkan login" });
  }

  try {
    // Verifikasi token
    const decode = jwt.verify(token, process.env.JWT);
    const { id, role } = decode;

    // Query berdasarkan role
    let data;
    if (role === "user") {
      data = await client.query(`SELECT * FROM "user" WHERE id = $1`, [id]);
    } else if (role === "admin") {
      data = await client.query("SELECT * FROM admin WHERE id = $1", [id]);
    } else {
      return res.status(401).json({ message: "Tidak ada otoritas" });
    }

    // Cek jika pengguna ditemukan
    if (data.rowCount === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Menyimpan data pengguna ke req.user
    req.user = data.rows[0];

    // Melanjutkan ke route berikutnya
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Token tidak valid atau telah kadaluarsa" });
  }
};

export const role = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Silahkan Login" });
    }

    // Memeriksa apakah role pengguna cocok
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Akses ditolak, tidak ada otoritas" });
    }

    // Melanjutkan ke route berikutnya
    next();
  };
};
