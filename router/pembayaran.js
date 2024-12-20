import express from "express";
import { client } from "../config/config.js";
import { authorize } from "../middleware/authorize.js";
import multer from "multer";
import path from "path";

const router = express.Router();

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/pembayaran");
  },
  filename: (req, file, cb) => {
    const username = req.user.nama.replace(/\s+/g, "_").toLowerCase();
    cb(null, `${username}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const uploadImg = multer({ storage: imgStorage });

router.get("/semua-pembayaran", authorize("admin"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT pembayaran.id, pembayaran.nama,
      pembayaran.nominal, pembayaran.berkas, user_info.tlp, pembayaran.user_id,
      pembayaran.ket
      FROM pembayaran
      INNER JOIN user_info ON user_info.id = pembayaran.user_id
      ORDER BY pembayaran.tgl_bayar DESC`
    );

    const payments = data.rows;

    res.status(200).json(payments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/data-pembayaran", authorize("admin"), async (req, res) => {
  try {
    const data = await client.query(`SELECT * FROM pembayaran`);

    const jml = data.rowCount;
    const total = data.rows.reduce(
      (total, pembayaran) => total + Number(pembayaran.nominal),
      0
    );

    return res.status(200).json({ jml, total });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/:id", authorize("user"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM pembayaran 
            INNER JOIN user_info on user_info.id = pembayaran.user_id
             WHERE user_id=$1`,
      [req.params.id]
    );

    if (!data) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    const payment = data.rows[0];

    res.status(200).json(payment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.post(
  "/upload-berkas",
  authorize("user"),
  uploadImg.single("file"),
  async (req, res) => {
    const { nama, nominal, media } = req.body;

    const imgLink =
      process.env.SERVER + "/assets/pembayaran/" + req.file.filename;

    await client.query(
      `INSERT INTO pembayaran(nama, nominal, berkas, user_id, media)
        VALUES($1, $2, $3, $4, $5) RETURNING *`,
      [nama, nominal, imgLink, req.user.id, media]
    );

    res.status(200).json({ message: "Berkas diterima" });

    try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.put(
  "/konfirmasi-pembayaran/:userId",
  authorize("admin"),
  async (req, res) => {
    try {
      const confirm = "Terkonfirmasi";
      const year = new Date().getFullYear();
      const status = true;

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
      await client.query(`UPDATE pembayaran SET ket = $1 WHERE user_id = $2`, [
        confirm,
        req.params.userId,
      ]);

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
