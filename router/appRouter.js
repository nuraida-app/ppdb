import express from "express";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";
import multer from "multer";
import path from "path";

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const uploadImg = multer({ storage: productStorage }).fields([
  { name: "logo", maxCount: 1 },
  { name: "cap", maxCount: 1 },
  { name: "kop_surat", maxCount: 1 },
]);

const router = express.Router();

router.post("/buat", isUser, role("admin"), uploadImg, async (req, res) => {
  try {
    const id = 1; // Assuming there's only one app config to update.
    const { name } = req.body;

    // Save the app name
    await client.query(`UPDATE app SET nama = $1 WHERE id = $2`, [name, id]);

    // Get the current app settings to retain existing images
    const currentApp = await client.query(
      `SELECT logo, cap, kop_surat FROM app WHERE id = $1`,
      [id]
    );
    const existingApp = currentApp.rows[0];

    // Handling file uploads
    const files = req.files || {};

    // Construct new image URLs only if files are uploaded, otherwise retain existing URLs
    const logoURL = files.logo
      ? process.env.SERVER + "/assets/images/" + files.logo[0].filename
      : existingApp.logo;
    const capURL = files.cap
      ? process.env.SERVER + "/assets/images/" + files.cap[0].filename
      : existingApp.cap;
    const kopURL = files.kop_surat
      ? process.env.SERVER + "/assets/images/" + files.kop_surat[0].filename
      : existingApp.kop_surat;

    // Update the app record with the new images or retain the existing ones
    await client.query(
      `UPDATE app SET logo = $1, cap = $2, kop_surat = $3 WHERE id = $4`,
      [logoURL, capURL, kopURL, id]
    );

    res.status(200).json({
      message: "Berhasil diperbarui",
      files: { logo: logoURL, cap: capURL, kop_surat: kopURL },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/tampil", async (req, res) => {
  try {
    const id = 1;

    const data = await client.query(`SELECT * FROM app WHERE id = $1`, [id]);

    const app = data.rows[0];

    res.status(200).json(app);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
