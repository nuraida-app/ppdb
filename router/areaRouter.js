import express from "express";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";

const router = express.Router();

router.get("/provinsi", isUser, role("admin", "user"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM wil_provinsi ORDER BY nama ASC`
    );

    const provinsi = data.rows;

    res.status(200).json(provinsi);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/regional/:provinsiId",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT * FROM wil_regional 
        WHERE provinsi_id = $1 ORDER BY nama ASC`,
        [req.params.provinsiId]
      );

      const regional = data.rows;

      res.status(200).json(regional);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/kecamatan/:regionalId",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT * FROM wil_kecamatan 
            WHERE regional_id = $1`,
        [req.params.regionalId]
      );

      const kecamatan = data.rows;

      res.status(200).json(kecamatan);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get("/desa/:kecId", isUser, role("admin", "user"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM wil_desa WHERE kecamatan_id = $1`,
      [req.params.kecId]
    );

    const desa = data.rows;

    res.status(200).json(desa);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
