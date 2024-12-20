import express from "express";
import { client } from "../config/config.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();

router.get("/demography", authorize("admin"), async (req, res) => {
  try {
    const queries = {
      provinsi: `
        SELECT provinsi_id, provinsi AS nama, COUNT(*) AS total
        FROM pendaftar
        GROUP BY provinsi_id, provinsi
      `,
      regional: `
        SELECT regional_id, regional AS nama, COUNT(*) AS total
        FROM pendaftar
        GROUP BY regional_id, regional
      `,
      kecamatan: `
        SELECT kec_id, kecamatan AS nama, COUNT(*) AS total
        FROM pendaftar
        GROUP BY kec_id, kecamatan
      `,
      desa: `
        SELECT desa_id, desa AS nama, COUNT(*) AS total
        FROM pendaftar
        GROUP BY desa_id, desa
      `,
    };

    // Jalankan semua query secara paralel
    const [provinsi, regional, kecamatan, desa] = await Promise.all([
      client.query(queries.provinsi),
      client.query(queries.regional),
      client.query(queries.kecamatan),
      client.query(queries.desa),
    ]);

    const demography = {
      provinsi: provinsi.rows,
      regional: regional.rows,
      kecamatan: kecamatan.rows,
      desa: desa.rows,
    };

    return res.status(200).json(demography);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/data-dashboard", authorize("admin"), async (req, res) => {
  try {
    const [pendaftarData, pembayaranData] = await Promise.all([
      client.query(`SELECT * FROM pendaftar`),
      client.query(`SELECT * FROM pembayaran`),
    ]);

    const pendaftar = pendaftarData.rowCount;
    const transaksi = pembayaranData.rowCount;
    const totalTransaksi = pembayaranData.rows.reduce(
      (acc, item) => acc + Number(item.nominal),
      0
    );

    res.status(200).json({ pendaftar, transaksi, totalTransaksi });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/pembayaran", authorize("admin"), async (req, res) => {
  try {
    // Dapatkan query parameter 'days', default ke 7 hari
    const days = req.query.days ? parseInt(req.query.days) : 7;

    // Batasi jumlah hari maksimal ke 30 hari
    const maxDays = Math.min(days, 30);

    // Query data nominal dan tanggal berdasarkan jumlah hari
    const query = `
      SELECT nominal, tgl_bayar 
      FROM pembayaran 
      WHERE tgl_bayar >= NOW() - INTERVAL '${maxDays} days'
      ORDER BY tgl_bayar ASC
    `;

    const result = await client.query(query);

    // Kirim data dalam format JSON
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/sosial-media", async (req, res) => {
  try {
    // Query to get the count of each media type
    const mediaCounts = await client.query(
      `SELECT media, COUNT(*) as count 
       FROM pembayaran 
       GROUP BY media`
    );

    // Total count of all media
    const total = mediaCounts.rows.reduce(
      (acc, item) => acc + parseInt(item.count),
      0
    );

    // Calculate percentage for each media
    const mediaAnalysis = mediaCounts.rows.map((item) => {
      const percentage = ((item.count / total) * 100).toFixed();
      return {
        media: item.media,
        count: item.count,
        percentage: percentage,
      };
    });

    res.status(200).json(mediaAnalysis);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
