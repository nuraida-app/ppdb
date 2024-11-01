import express from "express";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/pembayaran");
  },
  filename: (req, file, cb) => {
    const username = req.user.name.replace(/\s+/g, "_").toLowerCase();
    cb(null, `${username}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadImg = multer({ storage: imgStorage });

router.get("/semua-pembayaran", isUser, role("admin"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT pembayaran.id, pembayaran.nama,
      pembayaran.nominal, pembayaran.bukti, "user".phone,
      pembayaran.status
      FROM pembayaran
      INNER JOIN "user" ON "user".id = pembayaran.user_id
      ORDER BY pembayaran.createdat DESC`
    );

    const payments = data.rows;

    res.status(200).json(payments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", isUser, role("user"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM pembayaran 
            WHERE user_id=$1`,
      [req.params.id]
    );

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    const payment = data.rows[0];

    res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post(
  "/upload-berkas",
  isUser,
  role("user"),
  uploadImg.single("file"),
  async (req, res) => {
    const { name, price, media } = req.body;

    const status = "Diproses";

    const imgLink =
      process.env.SERVER + "/assets/pembayaran/" + req.file.filename;

    await client.query(
      `INSERT INTO pembayaran(nama, nominal, bukti, user_id, media, status)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, price, imgLink, req.user.id, media, status]
    );

    res.status(200).json({ message: "Bukti diterima" });

    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/konfirmasi-pembayaran/:userId",
  isUser,
  role("admin"),
  async (req, res) => {
    try {
      const confirm = "Terkonfirmasi";
      const year = new Date().getFullYear();
      const status = "Diproses";

      const data = await client.query(
        `SELECT * FROM pembayaran WHERE user_id = $1`,
        [req.params.userId]
      );

      if (data.rowCount === 0) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      if (data.rows[0].status === confirm) {
        return res
          .status(500)
          .json({ message: "Pembayaran sudah terkonfirmasi" });
      }

      // Konfirmasi pembayaran
      await client.query(
        `UPDATE pembayaran SET status = $1 WHERE user_id = $2`,
        [confirm, req.params.userId]
      );

      // Mendapatkan jumlah pendaftar yang sudah terkonfirmasi

      const { rows } = await client.query(
        `SELECT COUNT(*) FROM pendaftar WHERE kode_pendaftaran IS NOT NULL`
      );

      const totalConfirmed = parseInt(rows[0].count, 10) + 1;

      // Membuat kode pendaftar dinamis
      const kodeDaftar = `PPDB-${year}${String(totalConfirmed).padStart(
        4,
        "0"
      )}`;

      // Update kode_pembayaran untuk pendaftar
      await client.query(
        `INSERT INTO pendaftar(userid, kode_pendaftaran, status_pendaftaran) VALUES($1, $2, $3) RETURNING *`,
        [req.params.userId, kodeDaftar, status]
      );

      res.status(200).json({ message: "Pembayaran diterima" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

export default router;
