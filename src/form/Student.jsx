import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useAddStudentFormMutation,
  useGetStudentFromQuery,
} from "../api/service/formApi";
import { toast } from "react-toastify";
import "./styles.css";
import { useSelector } from "react-redux";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid dates
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Student = ({ tapel, edu, schools }) => {
  const { user } = useSelector((state) => state.user);
  const { data: siswa } = useGetStudentFromQuery(user?.id, { skip: !user?.id });
  const [addStudentFrom, { data, isSuccess, isLoading, error, reset }] =
    useAddStudentFormMutation();

  const [tapelId, setTapleId] = useState("");
  const [eduId, setEduId] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [nisn, setNisn] = useState("");
  const [noKk, setNoKk] = useState("");
  const [nik, setNik] = useState("");
  const [noAkta, setNoAkta] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("f");
  const [agama, setAgama] = useState("islam");
  const [anakKe, setAnakKe] = useState("");
  const [jumlahSaudara, setJumlahSaudara] = useState("");
  const [tinggiBadan, setTinggiBadan] = useState("");
  const [beratBadan, setBeratBadan] = useState("");
  const [lingkarKepala, setLingkarKepala] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidDate = (dateString) => {
      // Regular expression for date validation (yyyy-mm-dd)
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateString.match(regex)) return false;
      const date = new Date(dateString);
      return date instanceof Date && !isNaN(date);
    };

    // Validate date format before submission
    if (!isValidDate(formatDate(tanggalLahir))) {
      toast.error("Tanggal Lahir harus dalam format tahun-bulan-tanggal");
      return;
    }

    const data = {
      userId: user?.id,
      tapelId,
      eduId,
      schoolId,
      nisn,
      noKk,
      nik,
      noAkta,
      namaLengkap,
      tempatLahir,
      tanggalLahir: formatDate(tanggalLahir),
      jenisKelamin,
      agama,
      anakKe,
      jumlahSaudara,
      tinggiBadan,
      beratBadan,
      lingkarKepala,
    };

    addStudentFrom(data);
  };

  useEffect(() => {
    if (siswa) {
      setTapleId(siswa?.tapel_id);
      setEduId(siswa?.jenjang_id);
      setSchoolId(siswa?.sekolah_id);
      setNisn(siswa?.nisn);
      setNoKk(siswa?.no_kk);
      setNik(siswa?.nik);
      setNoAkta(siswa?.no_akta);
      setNamaLengkap(siswa?.nama);
      setTempatLahir(siswa?.tempat_lahir);
      setTanggalLahir(formatDate(siswa?.tanggal_lahir));
      setJenisKelamin(siswa?.kelamin);
      setAgama(siswa?.agama);
      setAnakKe(siswa?.anak_ke);
      setJumlahSaudara(siswa?.jml_saudara);
      setTinggiBadan(siswa?.tinggi);
      setBeratBadan(siswa?.berat);
      setLingkarKepala(siswa?.kepala);
    }
  }, [siswa]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setTapleId("");
      setEduId("");
      setSchoolId("");
      setNisn("");
      setNoKk("");
      setNik("");
      setNoAkta("");
      setNamaLengkap("");
      setTempatLahir("");
      setTanggalLahir("");
      setJenisKelamin("");
      setAgama("");
      setAnakKe("");
      setJumlahSaudara("");
      setTinggiBadan("");
      setBeratBadan("");
      setLingkarKepala("");
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, data, error]);

  return (
    <Box sx={{ mt: 2 }}>
      <form className="formulir" onSubmit={handleSubmit}>
        <FormControl size="small">
          <InputLabel>Tahun Pelajaran</InputLabel>
          <Select
            label="Tahun Pelajaran"
            value={tapelId || ""}
            onChange={(e) => setTapleId(e.target.value)}
          >
            {tapel?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.tapel}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Jenjang</InputLabel>
          <Select
            label="Jenjang"
            value={eduId || ""}
            onChange={(e) => setEduId(e.target.value)}
          >
            {edu?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nama}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Sekolah</InputLabel>
          <Select
            label="Sekolah"
            value={schoolId || ""}
            onChange={(e) => setSchoolId(e.target.value)}
          >
            {schools?.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.nama}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          required
          label="NISN"
          type="number"
          size="small"
          value={nisn || ""}
          onChange={(e) => setNisn(e.target.value)}
        />

        <TextField
          required
          label="No KK"
          type="number"
          size="small"
          value={noKk || ""}
          onChange={(e) => setNoKk(e.target.value)}
        />

        <TextField
          required
          label="NIK"
          type="number"
          size="small"
          value={nik || ""}
          onChange={(e) => setNik(e.target.value)}
        />

        <TextField
          required
          label="No Akta Lahir"
          type="number"
          size="small"
          value={noAkta || ""}
          onChange={(e) => setNoAkta(e.target.value)}
        />

        <TextField
          required
          label="Nama Lengkap"
          size="small"
          value={namaLengkap || ""}
          onChange={(e) => setNamaLengkap(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            required
            label="Tempat Lahir"
            size="small"
            value={tempatLahir || ""}
            onChange={(e) => setTempatLahir(e.target.value)}
          />
          <TextField
            required
            label="Tanggal Lahir"
            type="date"
            size="small"
            slotProps={{ inputLabel: { shrink: true } }}
            value={tanggalLahir || ""}
            onChange={(e) => setTanggalLahir(e.target.value)}
          />
        </Box>

        <FormControl size="small">
          <InputLabel>Jenis Kelamin</InputLabel>
          <Select
            value={jenisKelamin || ""}
            onChange={(e) => setJenisKelamin(e.target.value)}
            label="Jenis Kelamin"
          >
            <MenuItem value="f">Perempuan</MenuItem>
            <MenuItem value="m">Laki Laki</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Agama</InputLabel>
          <Select
            value={agama || ""}
            onChange={(e) => setAgama(e.target.value)}
            label="Agama"
          >
            <MenuItem value="islam">Islam</MenuItem>
            <MenuItem value="hindu">Hindu</MenuItem>
            <MenuItem value="budha">Budha</MenuItem>
            <MenuItem value="kristen">Kristen</MenuItem>
            <MenuItem value="other">Lainnya</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required
          label="Anak Ke"
          type="number"
          size="small"
          value={anakKe || ""}
          onChange={(e) => setAnakKe(e.target.value)}
        />

        <TextField
          required
          label="Jumlah Saudara"
          type="number"
          size="small"
          value={jumlahSaudara || ""}
          onChange={(e) => setJumlahSaudara(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            required
            label="Tinggi Badan"
            type="number"
            size="small"
            value={tinggiBadan || ""}
            onChange={(e) => setTinggiBadan(e.target.value)}
          />

          <TextField
            required
            label="Berat Badan"
            type="number"
            size="small"
            value={beratBadan || ""}
            onChange={(e) => setBeratBadan(e.target.value)}
          />

          <TextField
            required
            label="Lingkar Kepala"
            type="number"
            size="small"
            value={lingkarKepala || ""}
            onChange={(e) => setLingkarKepala(e.target.value)}
          />
        </Box>

        <Box alignSelf="end">
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color="success"
            type="submit"
          >
            Simpan
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Student;
