import express from "express";
import { client } from "../config/config.js";
import { authorize } from "../middleware/authorize.js";
const router = express.Router();

// Status pendaftaran
router.get("/proses", authorize("admin"), async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const search = req.query.search
      ? `%${req.query.search.toLowerCase()}%`
      : null;
    const status = req.query.status;

    const offset = (page - 1) * limit;

    let users = [];
    let totalPages;

    if (search) {
      const countQuery = `
        SELECT COUNT(*) FROM pendaftar
        WHERE status_pendaftaran = $1 AND (
          LOWER(kode_pendaftaran) LIKE $2 OR
          LOWER(nama) LIKE $2 OR
          nisn LIKE $2
        )`;

      const count = await client.query(countQuery, [status, search]);
      const total = parseInt(count.rows[0].count, 10);

      totalPages = Math.ceil(total / limit);

      const dataQuery = `
        SELECT id, userid, kode_pendaftaran, status_pendaftaran, nisn, nama,
        ayah_no_tlp, ibu_no_tlp
        FROM pendaftar
        WHERE status_pendaftaran = $1 AND (
          LOWER(kode_pendaftaran) LIKE $2 OR
          LOWER(nama) LIKE $2 OR
          nisn LIKE $2
        )
        ORDER BY kode_pendaftaran DESC
        LIMIT $3 OFFSET $4`;

      const data = await client.query(dataQuery, [
        status,
        search,
        limit,
        offset,
      ]);
      users = data.rows;
    } else {
      const countQuery = `
        SELECT COUNT(*) FROM pendaftar
        WHERE status_pendaftaran = $1`;

      const count = await client.query(countQuery, [status]);
      const total = parseInt(count.rows[0].count, 10);

      totalPages = Math.ceil(total / limit);

      const dataQuery = `
        SELECT id, userid, kode_pendaftaran, status_pendaftaran, nisn, nama,
        ayah_no_tlp, ibu_no_tlp
        FROM pendaftar
        WHERE status_pendaftaran = $1
        ORDER BY kode_pendaftaran DESC
        LIMIT $2 OFFSET $3`;

      const data = await client.query(dataQuery, [status, limit, offset]);
      users = data.rows;
    }

    res.status(200).json({ users, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Detail pendaftaran
router.get("/:userid", authorize("admin", "user"), async (req, res) => {
  try {
    const id = req.params.userid;

    const data = await client.query(
      `SELECT jenjang.nama AS jenjang, 
        jenjang.id AS jenjang_id, 
        sekolah.nama AS sekolah, 
        sekolah.id AS sekolah_id,
        tapel.id AS tapel_id, 
        tapel.tapel,
      pendaftar.kode_pendaftaran, pendaftar.status_pendaftaran,
      pendaftar.nisn, pendaftar.no_kk, pendaftar.nik, pendaftar.no_akta,
      pendaftar.nama, pendaftar.tempat_lahir, pendaftar.tanggal_lahir,
      pendaftar.kelamin, pendaftar.agama, pendaftar.anak_ke, pendaftar.jml_saudara,
      pendaftar.tinggi, pendaftar.berat, pendaftar.kepala,
      pendaftar.ayah_nik, pendaftar.ayah_nama, pendaftar.ayah_tempat_lahir, pendaftar.ayah_tanggal_lahir,
      pendaftar.ayah_pendidikan, pendaftar.ayah_pekerjaan, pendaftar.ayah_no_tlp,
      pendaftar.ibu_nik, pendaftar.ibu_nama, pendaftar.ibu_tempat_lahir, pendaftar.ibu_tanggal_lahir,
      pendaftar.ibu_pendidikan, pendaftar.ibu_pekerjaan, pendaftar.ibu_no_tlp, 
      pendaftar.createdat, pendaftar.userid
      FROM pendaftar 
       INNER JOIN jenjang ON jenjang.id = pendaftar.jenjang_id
         INNER JOIN tapel ON tapel.id = pendaftar.tapel_id
         INNER JOIN sekolah ON sekolah.id = pendaftar.sekolah_id
          WHERE userid = $1`,
      [id]
    );

    if (data.rowCount > 0) {
      const formulir = data.rows[0];

      res.status(200).json(formulir);
    } else {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Isi Formulir
// Biodata
router.post("/data-diri", authorize("user", "admin"), async (req, res) => {
  try {
    const userId = parseInt(req.query.userId, 10);

    const {
      tapel,
      jenjang,
      sekolah,
      nisn,
      no_kk,
      nik,
      no_akta,
      nama_lengkap,
      tempat_lahir,
      tanggal_lahir,
      kelamin,
      agama,
      anak_ke,
      jml_saudara,
      tb,
      bb,
      lingkar_kepala,
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
          jenjang,
          tapel,
          sekolah,
          nisn,
          no_kk,
          nik,
          no_akta,
          nama_lengkap,
          tempat_lahir,
          tanggal_lahir,
          kelamin,
          agama,
          anak_ke,
          jml_saudara,
          tb,
          bb,
          lingkar_kepala,
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
          jenjang,
          tapel,
          sekolah,
          nisn,
          no_kk,
          nik,
          no_akta,
          nama_lengkap,
          tempat_lahir,
          tanggal_lahir,
          kelamin,
          agama,
          anak_ke,
          jml_saudara,
          tb,
          bb,
          lingkar_kepala,
        ]
      );

      res.status(200).json({ message: "Data berhasil disimpan" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Orang Tua
router.post("/orangtua", authorize("admin", "user"), async (req, res) => {
  try {
    const userId = parseInt(req.query.userId, 10);

    const {
      ayah_nik,
      ayah_nama,
      ayah_tempat_lahir,
      ayah_tanggal_lahir,
      ayah_pendidikan,
      ayah_pekerjaan,
      ayah_no_tlp,
      ibu_nik,
      ibu_nama,
      ibu_tempat_lahir,
      ibu_tanggal_lahir,
      ibu_pendidikan,
      ibu_pekerjaan,
      ibu_no_tlp,
    } = req.body;

    const data = await client.query(
      `SELECT * FROM pendaftar WHERE userid = $1`,
      [userId]
    );

    if (data.rowCount > 0) {
      await client.query(
        `UPDATE pendaftar SET ayah_nik = $1, ayah_nama = $2, ayah_tempat_lahir = $3,
        ayah_tanggal_lahir = $4, ayah_pendidikan = $5, ayah_pekerjaan = $6,
         ayah_no_tlp = $7, ibu_nik = $8, ibu_nama = $9,
        ibu_tempat_lahir = $10, ibu_tanggal_lahir = $11, ibu_pendidikan = $12, ibu_pekerjaan = $13,
         ibu_no_tlp = $14 WHERE userid = $15`,
        [
          ayah_nik,
          ayah_nama,
          ayah_tempat_lahir,
          ayah_tanggal_lahir,
          ayah_pendidikan,
          ayah_pekerjaan,
          ayah_no_tlp,
          ibu_nik,
          ibu_nama,
          ibu_tempat_lahir,
          ibu_tanggal_lahir,
          ibu_pendidikan,
          ibu_pekerjaan,
          ibu_no_tlp,
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

router.post("/keluarga", authorize("user"), async (req, res) => {
  try {
    const { nama, tgl } = req.body;

    const userId = req.user.id;

    await client.query(
      `INSERT INTO keluarga(user_id, nama, tanggal_lahir) VALUES($1, $2, $3) RETURNING *`,
      [userId, nama, tgl]
    );

    return res.status(200).json({ message: "Data Berhasil disimpan" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.get("/keluarga/:id", authorize("user"), async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10);
    const limit = parseInt(req.query.limit, 10);
    const search = req.query.search
      ? `%${req.query.search.toLowerCase()}%`
      : null;

    const offset = (page - 1) * limit;

    let families = [];
    let totalPages;

    if (search) {
      const countQuery = await client.query(
        `SELECT COUNT(*) FROM keluarga WHERE user_id = $1
        AND LOWER(nama) LIKE $2`,
        [req.user.id, search]
      );

      const total = parseInt(countQuery.rows[0].count, 10);

      totalPages = Math.ceil(total / limit);

      const data = await client.query(
        `SELECT * FROM keluarga WHERE user_id = $1 AND LOWER(nama) LIKE $2
          ORDER BY tanggal_lahir DESC LIMIT $3 OFFSET $4`,
        [req.user.id, search, limit, offset]
      );

      families = data.rows;
    } else {
      const countQuery = await client.query(
        `SELECT COUNT(*) FROM keluarga WHERE user_id = $1`,
        [req.user.id]
      );

      const total = parseInt(countQuery.rows[0].count, 10);

      totalPages = Math.ceil(total / limit);

      const data = await client.query(
        `SELECT * FROM keluarga WHERE user_id = $1 ORDER BY tanggal_lahir DESC LIMIT $2 OFFSET $3`,
        [req.user.id, limit, offset]
      );

      families = data.rows;
    }

    res.status(200).json({ families, totalPages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/hapus-keluarga/:id", authorize("user"), async (req, res) => {
  try {
    const id = req.params.id;

    await client.query(`DELETE FROM keluarga WHERE id = $1`, [id]);

    res.status(200).json({ message: "Berhasil dihapus" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
