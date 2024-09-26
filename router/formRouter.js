import express from "express";
import { client } from "../config/database.js";
import { isUser, role } from "../middlewares/Auth.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fastcsv from "fast-csv";

const router = express.Router();

// download csv file
router.get("/download-csv", async (req, res) => {
  const query = `
    SELECT jenjang.nama  AS jenjang, sekolah.nama AS sekolah, tapel.tapel,
      pendaftar.kode_pendaftaran, pendaftar.status_pendaftaran,
      pendaftar.nisn, pendaftar.no_kk, pendaftar.nik, pendaftar.no_akta,
      pendaftar.nama, pendaftar.tempat_lahir, pendaftar.tanggal_lahir,
      pendaftar.kelamin, pendaftar.agama, pendaftar.anak_ke, pendaftar.jml_saudara,
      pendaftar.tinggi, pendaftar.berat, pendaftar.kepala, pendaftar.negara,
      pendaftar.provinsi, pendaftar.regional, pendaftar.kecamatan, pendaftar.desa,
      pendaftar.alamat, pendaftar.rt_rw, pendaftar.kode_pos, pendaftar.jarak,
      pendaftar.menit, pendaftar.transportasi, pendaftar.nik_ayah, pendaftar.nama_ayah,
      pendaftar.lahir_ayah, pendaftar.tanggal_ayah, pendaftar.pendidikan_ayah,
      pendaftar.pekerjaan_ayah, pendaftar.penghasilan_ayah, pendaftar.tlp_ayah,
      pendaftar.nik_ibu, pendaftar.nama_ibu, pendaftar.lahir_ibu, pendaftar.tanggal_ibu,
      pendaftar.pendidikan_ibu, pendaftar.pekerjaan_ibu, pendaftar.penghasilan_ibu,
      pendaftar.tlp_ibu, pendaftar.npsn, pendaftar.nama_sekolah, pendaftar.provinsi_sekolah,
      pendaftar.regional_sekolah, pendaftar.kec_sekolah, pendaftar.desa_sekolah,
      pendaftar.provinsi_id_sekolah, pendaftar.regional_id_sekolah, pendaftar.kec_id_sekolah,
      pendaftar.desa_id_sekolah
    FROM pendaftar 
    INNER JOIN jenjang ON jenjang.id = pendaftar.jenjang_id
    INNER JOIN tapel ON tapel.id = pendaftar.tapel_id
    INNER JOIN sekolah ON sekolah.id = pendaftar.sekolah_id
    WHERE pendaftar.status_pendaftaran = 'Diterima'
    ORDER BY pendaftar.createdat ASC
  `;

  try {
    const result = await client.query(query);
    const data = result.rows;

    const simplifiedData = data.map((item) => ({
      kode_pendaftaran: item.kode_pendaftaran,
      jenjang: item.jenjang,
      sekolah: item.sekolah,
      tapel: item.tapel,
      nisn: item.nisn,
      no_kk: item.no_kk,
      nik: item.nik,
      no_akta: item.no_akta,
      nama: item.nama,
      tempat_lahir: item.tempat_lahir,
      tanggal_lahir: item.tanggal_lahir,
      kelamin: item.kelamin,
      agama: item.agama,
      anak_ke: item.anak_ke,
      jml_saudara: item.jml_saudara,
      tinggi: item.tinggi,
      berat: item.berat,
      kepala: item.kepala,
      negara: item.negara,
      provinsi: item.provinsi,
      regional: item.regional,
      kecamatan: item.kecamatan,
      desa: item.desa,
      alamat: item.alamat,
      rt_rw: item.rt_rw,
      kode_pos: item.kode_pos,
      jarak: item.jarak,
      menit: item.menit,
      transportasi: item.transportasi,
      nik_ayah: item.nik_ayah,
      nama_ayah: item.nama_ayah,
      lahir_ayah: item.lahir_ayah,
      tanggal_ayah: item.tanggal_ayah,
      pendidikan_ayah: item.pendidikan_ayah,
      pekerjaan_ayah: item.pekerjaan_ayah,
      penghasilan_ayah: item.penghasilan_ayah,
      tlp_ayah: item.tlp_ayah,
      nik_ibu: item.nik_ibu,
      nama_ibu: item.nama_ibu,
      lahir_ibu: item.lahir_ibu,
      tanggal_ibu: item.tanggal_ibu,
      pendidikan_ibu: item.pendidikan_ibu,
      pekerjaan_ibu: item.pekerjaan_ibu,
      penghasilan_ibu: item.penghasilan_ibu,
      tlp_ibu: item.tlp_ibu,
      sekolah_sebelumnya: item.nama_sekolah,
      provinsi_sekolah: item.provinsi_sekolah,
      regional_sekolah: item.regional_sekolah,
      kec_sekolah: item.kec_sekolah,
      desa_sekolah: item.desa_sekolah,
      status_pendaftaran: item.status_pendaftaran,
    }));

    // Set the headers for downloading a CSV file
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=pendaftar_diterima.csv"
    );

    // Use fast-csv to directly write CSV to the response stream
    fastcsv
      .write(simplifiedData, { headers: true })
      .on("error", (err) => {
        console.error("Error writing CSV", err);
        res.status(500).send("Error writing CSV");
      })
      .pipe(res); // Directly pipe the CSV to the response stream
  } catch (error) {
    console.error("Error fetching data", error);
    res.status(500).send("Error fetching data");
  }
});

// Menampilkan seluruh formulir
router.get("/tampilkan", isUser, role("admin"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM pendaftar ORDER BY kode_pendaftaran DESC`
    );

    const perndaftar = data.rows;

    res.status(200).json(perndaftar);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// formulir berdasarkan userId
router.get("/:userId", isUser, role("admin", "user"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT jenjang.nama  AS jenjang, sekolah.nama AS sekolah, tapel.tapel,
      pendaftar.kode_pendaftaran, pendaftar.status_pendaftaran,
      pendaftar.nisn, pendaftar.no_kk, pendaftar.nik, pendaftar.no_akta,
      pendaftar.nama, pendaftar.tempat_lahir, pendaftar.tanggal_lahir,
      pendaftar.kelamin, pendaftar.agama, pendaftar.anak_ke, pendaftar.jml_saudara,
      pendaftar.tinggi, pendaftar.berat, pendaftar.kepala, pendaftar.negara,
      pendaftar.provinsi, pendaftar.regional, pendaftar.kecamatan, pendaftar.desa,
      pendaftar.alamat, pendaftar.rt_rw, pendaftar.kode_pos, pendaftar.jarak,
      pendaftar.menit, pendaftar.transportasi, pendaftar.nik_ayah, pendaftar.nama_ayah,
      pendaftar.lahir_ayah, pendaftar.tanggal_ayah, pendaftar.pendidikan_ayah,
      pendaftar.pekerjaan_ayah, pendaftar.penghasilan_ayah, pendaftar.tlp_ayah,
      pendaftar.nik_ibu, pendaftar.nama_ibu, pendaftar.lahir_ibu, pendaftar.tanggal_ibu,
      pendaftar.pendidikan_ibu, pendaftar.pekerjaan_ibu, pendaftar.penghasilan_ibu,
      pendaftar.tlp_ibu, pendaftar.npsn, pendaftar.nama_sekolah, pendaftar.provinsi_sekolah,
      pendaftar.regional_sekolah, pendaftar.kec_sekolah, pendaftar.desa_sekolah, pendaftar.berkas,
      pendaftar.provinsi_id_sekolah, pendaftar.regional_id_sekolah, pendaftar.kec_id_sekolah,
      pendaftar.desa_id_sekolah, pendaftar.keluarga, pendaftar.kesehatan, pendaftar.createdat,
      pendaftar.userid
      FROM pendaftar 
       INNER JOIN jenjang ON jenjang.id = pendaftar.jenjang_id
         INNER JOIN tapel ON tapel.id = pendaftar.tapel_id
         INNER JOIN sekolah ON sekolah.id = pendaftar.sekolah_id
          WHERE userid = $1`,
      [req.params.userId]
    );

    if (data.rowCount > 0) {
      const formulir = data.rows[0];

      res.status(200).json(formulir);
    } else {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

// Diterima
router.put("/diterima/:userid", isUser, role("admin"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM pendaftar WHERE userid = $1`,
      [req.params.userid]
    );

    const status = "Diterima";

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE pendaftar SET status_pendaftaran = $1 WHERE userid = $2`,
        [status, req.params.userid]
      );

      res.status(200).json({ message: "Status Pendaftaran Diterima" });
    } else {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Ditolak
router.put("/ditolak/:userid", isUser, role("admin"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM pendaftar WHERE userid = $1`,
      [req.params.userid]
    );

    const status = "Ditolak";

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE pendaftar SET status_pendaftaran = $1 WHERE userid = $2`,
        [status, req.params.userid]
      );

      res.status(200).json({ message: "Status Pendaftaran Ditolak" });
    } else {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Diproses
router.put("/menunggu/:userid", isUser, role("admin"), async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM pendaftar WHERE userid = $1`,
      [req.params.userid]
    );

    const status = "Diproses";

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE pendaftar SET status_pendaftaran = $1 WHERE userid = $2`,
        [status, req.params.userid]
      );

      res.status(200).json({ message: "Status Pendaftaran Menunggu" });
    } else {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Data Diri
router.post("/data-diri", isUser, role("user", "admin"), async (req, res) => {
  try {
    const {
      userId,
      tapelId,
      eduId,
      schoolId,
      nisn,
      noKk,
      nik,
      noAkta,
      namaLengkap,
      tempatLahir,
      tanggalLahir,
      jenisKelamin,
      agama,
      anakKe,
      jumlahSaudara,
      tinggiBadan,
      beratBadan,
      lingkarKepala,
    } = req.body;

    const data = await client.query(
      `SELECT * FROM pendaftar WHERE userid = $1`,
      [userId]
    );

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE pendaftar SET jenjang_id = $1, tapel_id = $2, sekolah_id = $3, nisn = $4,
                no_kk = $5, nik = $6, no_akta = $7, nama = $8, tempat_lahir = $9, tanggal_lahir = $10,
                kelamin = $11, agama = $12, anak_ke = $13, jml_saudara = $14, tinggi = $15,
                berat = $16, kepala = $17 WHERE userid = $18`,
        [
          eduId,
          tapelId,
          schoolId,
          nisn,
          noKk,
          nik,
          noAkta,
          namaLengkap,
          tempatLahir,
          tanggalLahir,
          jenisKelamin,
          agama,
          anakKe,
          jumlahSaudara,
          tinggiBadan,
          beratBadan,
          lingkarKepala,
          userId,
        ]
      );

      res.status(200).json({ message: "Data berhasil diperbarui" });
    } else {
      await client.query(
        `INSERT INTO pendaftar(userid, jenjang_id, tapel_id, sekolah_id, nisn,
            no_kk, nik, no_akta, nama, tempat_lahir, tanggal_lahir,
            kelamin, agama, anak_ke, jml_saudara, tinggi, berat, kepala) VALUES($1, $2,
            $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *`,
        [
          userId,
          eduId,
          tapelId,
          schoolId,
          nisn,
          noKk,
          nik,
          noAkta,
          namaLengkap,
          tempatLahir,
          tanggalLahir,
          jenisKelamin,
          agama,
          anakKe,
          jumlahSaudara,
          tinggiBadan,
          beratBadan,
          lingkarKepala,
        ]
      );

      res.status(200).json({ message: "Data berhasil disimpan" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/data-diri/:userId",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT pendaftar.jenjang_id, jenjang.nama AS nama_jenjang,
                pendaftar.tapel_id, tapel.tapel AS thn_ajar, pendaftar.sekolah_id, sekolah.nama AS sekolah,
                pendaftar.nisn, pendaftar.no_kk, pendaftar.nik, pendaftar.no_akta, pendaftar.nama,
                pendaftar.tempat_lahir, pendaftar.tanggal_lahir, pendaftar.kelamin, pendaftar.agama,
                pendaftar.anak_ke, pendaftar.jml_saudara, pendaftar.tinggi, pendaftar.berat, pendaftar.kepala 
         FROM pendaftar
         INNER JOIN jenjang ON jenjang.id = pendaftar.jenjang_id
         INNER JOIN tapel ON tapel.id = pendaftar.tapel_id
         INNER JOIN sekolah ON sekolah.id = pendaftar.sekolah_id
         WHERE pendaftar.userid = $1`,
        [req.params.userId]
      );

      const pendaftar = data.rows[0];

      if (!pendaftar) {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }

      res.status(200).json(pendaftar);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Alamat
router.post("/alamat", isUser, role("admin", "user"), async (req, res) => {
  try {
    const {
      userId,
      negara,
      provinsi_id,
      provinsi,
      regional_id,
      regional,
      kec_id,
      kecamatan,
      desa_id,
      desa,
      alamat,
      rt_rw,
      kode_pos,
      jarak,
      menit,
      transportasi,
    } = req.body;

    const data = await client.query(
      `SELECT * FROM pendaftar WHERE userid = $1`,
      [userId]
    );

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE pendaftar SET negara = $1, provinsi_id = $2,
            provinsi = $3, regional_id = $4, regional = $5, kec_id = $6, kecamatan = $7,
            desa_id = $8, desa = $9, alamat = $10, rt_rw = $11, kode_pos = $12, jarak = $13, menit = $14,
            transportasi = $15 WHERE userid = $16`,
        [
          negara,
          provinsi_id,
          provinsi,
          regional_id,
          regional,
          kec_id,
          kecamatan,
          desa_id,
          desa,
          alamat,
          rt_rw,
          kode_pos,
          jarak,
          menit,
          transportasi,
          userId,
        ]
      );

      return res.status(200).json({ message: "Data Berhasil disipan" });
    } else {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/alamat/:userId",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT pendaftar.negara, pendaftar.provinsi_id, pendaftar.provinsi,
            pendaftar.regional_id, pendaftar.regional,
            pendaftar.kec_id, pendaftar.kecamatan, pendaftar.desa_id, pendaftar.desa,
            pendaftar.alamat, pendaftar.rt_rw, pendaftar.kode_pos,
            pendaftar.jarak, pendaftar.menit, pendaftar.transportasi
            FROM pendaftar WHERE userid = $1`,
        [req.params.userId]
      );

      const alamat = data.rows[0];

      res.status(200).json(alamat);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Orangtua
router.post("/orangtua", isUser, role("admin", "user"), async (req, res) => {
  try {
    const {
      userId,
      ayahNik,
      ayahNama,
      ayahTempatLahir,
      ayahTanggalLahir,
      ayahPendidikan,
      ayahPekerjaan,
      ayahPenghasilan,
      ayahNoTlp,
      ibuNik,
      ibuNama,
      ibuTempatLahir,
      ibuTanggalLahir,
      ibuPendidikan,
      ibuPekerjaan,
      ibuPenghasilan,
      ibuNoTlp,
    } = req.body;

    const data = await client.query(
      `SELECT * FROM pendaftar WHERE userid = $1`,
      [userId]
    );

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE pendaftar SET nik_ayah = $1, nama_ayah = $2, lahir_ayah = $3,
        tanggal_ayah = $4, pendidikan_ayah = $5, pekerjaan_ayah = $6,
        penghasilan_ayah = $7, tlp_ayah = $8, nik_ibu = $9, nama_ibu = $10,
        lahir_ibu = $11, tanggal_ibu = $12, pendidikan_ibu = $13, pekerjaan_ibu = $14,
        penghasilan_ibu = $15, tlp_ibu = $16 WHERE userid = $17`,
        [
          ayahNik,
          ayahNama,
          ayahTempatLahir,
          ayahTanggalLahir,
          ayahPendidikan,
          ayahPekerjaan,
          ayahPenghasilan,
          ayahNoTlp,
          ibuNik,
          ibuNama,
          ibuTempatLahir,
          ibuTanggalLahir,
          ibuPendidikan,
          ibuPekerjaan,
          ibuPenghasilan,
          ibuNoTlp,
          userId,
        ]
      );

      return res.status(200).json({ message: "Data Berhasil disipan" });
    } else {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/orangtua/:userId",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const id = req.params.userId;

      const data = await client.query(
        `SELECT pendaftar.nik_ayah, pendaftar.nama_ayah,
      pendaftar.lahir_ayah, pendaftar.tanggal_ayah, pendaftar.pendidikan_ayah,
      pendaftar.pekerjaan_ayah, pendaftar.penghasilan_ayah, pendaftar.tlp_ayah,
      pendaftar.nik_ibu, pendaftar.nama_ibu, pendaftar.lahir_ibu,
      pendaftar.tanggal_ibu, pendaftar.pendidikan_ibu, pendaftar.pekerjaan_ibu,
      pendaftar.penghasilan_ibu, pendaftar.tlp_ibu
       FROM pendaftar WHERE userid = $1`,
        [id]
      );

      const orangtua = data.rows[0];

      res.status(200).json(orangtua);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Asal Sekolah
router.post(
  "/asal-sekolah",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const {
        userId,
        npsn,
        name,
        provinsi,
        provinsi_id,
        regional,
        regional_id,
        kecamatan,
        kec_id,
        desa,
        desa_id,
      } = req.body;

      const data = await client.query(
        `SELECT * FROM pendaftar WHERE userid = $1`,
        [userId]
      );

      if (data.rowCount > 0) {
        await client.query(
          `UPDATE pendaftar SET npsn = $1, nama_sekolah = $2,
        provinsi_sekolah = $3, provinsi_id_sekolah = $4, regional_sekolah = $5,
        regional_id_sekolah = $6, kec_sekolah = $7, kec_id_sekolah = $8,
        desa_sekolah = $9, desa_id_sekolah = $10 WHERE userid = $11`,
          [
            npsn,
            name,
            provinsi,
            provinsi_id,
            regional,
            regional_id,
            kecamatan,
            kec_id,
            desa,
            desa_id,
            userId,
          ]
        );

        res.status(200).json({ message: "Data berhasil diperbarui" });
      } else {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/asal-sekolah/:userid",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT pendaftar.npsn, pendaftar.nama_sekolah,
      pendaftar.provinsi_sekolah, pendaftar.regional_sekolah,
      pendaftar.kec_sekolah, pendaftar.desa_sekolah,
      pendaftar.provinsi_id_sekolah, pendaftar.regional_id_sekolah,
      pendaftar.kec_id_sekolah, pendaftar.desa_id_sekolah FROM pendaftar WHERE userid = $1`,
        [req.params.userid]
      );

      const sekolah = data.rows[0];

      res.status(200).json(sekolah);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Kesehatan
router.post("/kesehatan", isUser, role("admin", "user"), async (req, res) => {
  try {
    const { userId, note } = req.body;

    const data = await client.query(
      `SELECT * FROM pendaftar WHERE userid = $1`,
      [userId]
    );

    if (data.rowCount > 0) {
      const currentData = data.rows[0].kesehatan ? data.rows[0].kesehatan : [];

      const healthInfo = new Map();
      // Add existing health data to the map
      currentData.forEach((item) => healthInfo.set(item.id, item));

      // Add new or updated note
      if (note && typeof note === "object") {
        healthInfo.set(note.id, note);
      }

      const updateData = Array.from(healthInfo.values());

      await client.query(
        `UPDATE pendaftar SET kesehatan = $1 WHERE userid = $2`,
        [JSON.stringify(updateData), userId]
      );

      res.status(200).json({ message: "Data Berhasil disimpan" });
    } else {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/kesehatan/:userid",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT kesehatan FROM pendaftar WHERE userid = $1`,
        [req.params.userid]
      );

      const kesehatan = data.rows[0]?.kesehatan;

      res.status(200).json(kesehatan);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/hapus-kesehatan",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const { userId, noteId } = req.body;

      const data = await client.query(
        `SELECT * FROM pendaftar WHERE userid = $1`,
        [userId]
      );

      if (data.rowCount > 0) {
        const currentData = data.rows[0].kesehatan || [];

        const updateData = currentData.filter((item) => item.id !== noteId);

        await client.query(
          `UPDATE pendaftar SET kesehatan = $1 WHERE userid = $2`,
          [JSON.stringify(updateData), userId]
        );

        res.status(200).json({ message: "Data berhasil dihapus" });
      } else {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Keluarga
router.post("/keluarga", isUser, role("admin", "user"), async (req, res) => {
  try {
    const { userId, note } = req.body;

    const data = await client.query(
      `SELECT * FROM pendaftar WHERE userid = $1`,
      [userId]
    );

    if (data.rowCount > 0) {
      const currentData = data.rows[0].keluarga ? data.rows[0].keluarga : [];

      const familyInfo = new Map();
      // Add existing health data to the map
      currentData.forEach((item) => familyInfo.set(item.id, item));

      // Add new or updated note
      if (note && typeof note === "object") {
        familyInfo.set(note.id, note);
      }

      const updateData = Array.from(familyInfo.values());

      await client.query(
        `UPDATE pendaftar SET keluarga = $1 WHERE userid = $2`,
        [JSON.stringify(updateData), userId]
      );

      res.status(200).json({ message: "Data Berhasil disimpan" });
    } else {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get(
  "/keluarga/:userid",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT keluarga FROM pendaftar WHERE userid = $1`,
        [req.params.userid]
      );

      const keluarga = data.rows[0]?.keluarga;

      res.status(200).json(keluarga);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

router.delete(
  "/hapus-keluarga",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const { userId, familyId } = req.body;

      const data = await client.query(
        `SELECT * FROM pendaftar WHERE userid = $1`,
        [userId]
      );

      if (data.rowCount > 0) {
        const currentData = data.rows[0].keluarga || [];

        const updateData = currentData.filter((item) => item.id !== familyId);

        await client.query(
          `UPDATE pendaftar SET keluarga = $1 WHERE userid = $2`,
          [JSON.stringify(updateData), userId]
        );

        res.status(200).json({ message: "Data berhasil dihapus" });
      } else {
        return res.status(404).json({ message: "Data tidak ditemukan" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Berkas
// Define file codes
const fileCodes = {
  KK: "Kartu Keluarga",
  Akta: "Akta Kelahiran",
  Ayah: "KTP Ayah",
  Ibu: "KTP Ibu",
  IJSKL: "Ijazah / SKL",
  Foto: "Foto",
  Rapot: "Rapot",
};

// Multer storage configuration
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.user.name.replace(/\s+/g, "_").toLowerCase();
    const userFolder = `./assets/berkas/${username}`;

    // Create a folder if it doesn't already exist
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder, { recursive: true });
    }
    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    const username = req.user.name.replace(/\s+/g, "_").toLowerCase();
    const fileCode = fileCodes[file.fieldname] || "File";

    // Sanitize filename (replace spaces and special characters)
    const sanitizedFileCode = fileCode
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "_");
    const extension = path.extname(file.originalname).toLowerCase();

    cb(null, `${username}_${sanitizedFileCode}${extension}`);
  },
});

// Multer configuration for file type and size check
const uploadImg = multer({
  storage: imgStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const fileType = path.extname(file.originalname).toLowerCase();
    if (file.fieldname === "Foto") {
      // Allow all image file types for the 'Foto' field
      if (![".jpg", ".jpeg", ".png", ".gif"].includes(fileType)) {
        return cb(
          new Error("Allowed image formats are .jpg, .jpeg, .png, .gif")
        );
      }
    } else {
      // Restrict other fields to only PDF files
      if (fileType !== ".pdf") {
        return cb(new Error("Only PDF files are allowed for this field"));
      }
    }
    cb(null, true);
  },
});
const __dirname = dirname(fileURLToPath(import.meta.url));

// Upload route
router.post(
  "/upload-berkas",
  isUser,
  role("admin", "user"),
  uploadImg.fields([
    { name: "KK", maxCount: 1 },
    { name: "Akta", maxCount: 1 },
    { name: "Ayah", maxCount: 1 },
    { name: "Ibu", maxCount: 1 },
    { name: "IJSKL", maxCount: 1 },
    { name: "Foto", maxCount: 1 },
    { name: "Rapot", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files) {
        return res.status(400).json({ message: "Tidak ada berkas" });
      }

      const username = req.user.name.replace(/\s+/g, "_").toLowerCase();
      const userFolder = `${username}`;

      // Fetch existing files from the database
      const userQuery = `SELECT berkas FROM pendaftar WHERE userid = $1`;
      const { rows } = await client.query(userQuery, [req.user.id]);
      let existingFiles = rows[0]?.berkas || [];

      // Update or add new files
      Object.keys(req.files).forEach((key) => {
        const fileUrl = `${process.env.SERVER}/assets/berkas/${userFolder}/${req.files[key][0].filename}`;

        // Check if the file key already exists in the array
        const fileIndex = existingFiles.findIndex((obj) => obj[key]);

        if (fileIndex !== -1) {
          // If file key exists, update the URL
          existingFiles[fileIndex][key] = fileUrl;
        } else {
          // If file key doesn't exist, add a new object for that file
          existingFiles.push({ [key]: fileUrl });
        }
      });

      // Update the database with the modified file array
      const updateQuery = `
        UPDATE pendaftar 
        SET berkas = $1 
        WHERE userid = $2
      `;
      await client.query(updateQuery, [
        JSON.stringify(existingFiles),
        req.user.id,
      ]);

      res.status(200).json({
        message: "Berkas berhasil disimpan",
        fileLinks: existingFiles,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

router.post(
  "/hapus-berkas",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const { userId, fileKey } = req.body;
      const username = req.user.name.replace(/\s+/g, "_").toLowerCase();
      const userFolder = `${username}`;

      if (!fileKey) {
        return res.status(400).json({ message: "File Key tidak tersedia" });
      }

      // Fetch the user data from the database
      const userQuery = `
      SELECT berkas FROM pendaftar WHERE userid = $1
    `;
      const { rows } = await client.query(userQuery, [userId]);
      const userFiles = rows[0]?.berkas;

      if (!userFiles) {
        return res
          .status(404)
          .json({ message: "Berkas tidak ditemukan untuk anda" });
      }

      // Find the file object in the array
      const fileObjIndex = userFiles.findIndex((obj) => obj[fileKey]);

      if (fileObjIndex === -1) {
        return res.status(404).json({ message: "Berkas tidak ditemukan" });
      }

      const fileUrl = userFiles[fileObjIndex][fileKey];
      const fileName = path.basename(fileUrl);
      const filePath = path.join(
        __dirname,
        `../assets/berkas/${userFolder}/${fileName}`
      );

      // Delete the file from the filesystem
      fs.unlink(filePath, (err) => {
        if (err) {
          return res.status(500).json({ message: "Berkas gagal dihapus" });
        }

        // Remove only the specific file link from the array without removing other keys
        userFiles[fileObjIndex][fileKey] = null;

        // Update the database with the modified file array
        const updateQuery = `
        UPDATE pendaftar 
        SET berkas = $1 
        WHERE userid = $2
      `;
        client.query(updateQuery, [JSON.stringify(userFiles), userId]);

        res.status(200).json({ message: "Berkas berhasil dihapus" });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);

router.get(
  "/berkas/:userid",
  isUser,
  role("admin", "user"),
  async (req, res) => {
    try {
      const data = await client.query(
        `SELECT berkas FROM pendaftar WHERE userid = $1`,
        [req.params.userid]
      );

      const berkas = data.rows[0].berkas;

      res.status(200).json(berkas);
    } catch (error) {
      return res(500).json({ message: error.message });
    }
  }
);

export default router;
