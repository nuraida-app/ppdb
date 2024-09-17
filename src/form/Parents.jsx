import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  useAddPratentsMutation,
  useGetParentsFormQuery,
} from "../api/service/formApi";
import "./styles.css";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid dates
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const convertPhoneNumber = (phone) => {
  if (phone?.startsWith("0")) {
    return `62${phone.slice(1)}`;
  }
  return phone;
};

const formatCurrency = (value) => {
  const number = value?.replace(/[^\d]/g, "");
  return `Rp ${parseInt(number, 10).toLocaleString("id-ID")}`;
};

const parseCurrency = (value) => {
  return value.replace(/[^\d]/g, ""); // remove 'Rp' and any non-numeric characters
};

const Parents = () => {
  const { user } = useSelector((state) => state.user);
  const { data: parents } = useGetParentsFormQuery(user?.id, {
    skip: !user?.id,
  });
  const [addParents, { data, isSuccess, error, isLoading, reset }] =
    useAddPratentsMutation();

  const [formData, setFormData] = useState({
    userId: user?.id, // Ensure userId is included
    ayahNik: "",
    ayahNama: "",
    ayahTempatLahir: "",
    ayahTanggalLahir: "",
    ayahPendidikan: "SD",
    ayahPekerjaan: "",
    ayahPenghasilan: "",
    ayahNoTlp: "",
    ibuNik: "",
    ibuNama: "",
    ibuTempatLahir: "",
    ibuTanggalLahir: "",
    ibuPendidikan: "SD",
    ibuPekerjaan: "",
    ibuPenghasilan: "",
    ibuNoTlp: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:
        name === "ayahNoTlp" || name === "ibuNoTlp"
          ? convertPhoneNumber(value)
          : value,
      userId: prevState.userId || user?.id, // Ensure userId remains unchanged
    }));
  };

  const handleCurrencyChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: formatCurrency(value),
      userId: prevState.userId || user?.id, // Ensure userId remains unchanged
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      ayahPenghasilan: parseCurrency(formData.ayahPenghasilan),
      ibuPenghasilan: parseCurrency(formData.ibuPenghasilan),
    };

    addParents(dataToSubmit);

    console.log(dataToSubmit);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setFormData({
        userId: user?.id, // Ensure userId is retained after reset
        ayahNik: "",
        ayahNama: "",
        ayahTempatLahir: "",
        ayahTanggalLahir: "",
        ayahPendidikan: "SD",
        ayahPekerjaan: "",
        ayahPenghasilan: "",
        ayahNoTlp: "",
        ibuNik: "",
        ibuNama: "",
        ibuTempatLahir: "",
        ibuTanggalLahir: "",
        ibuPendidikan: "SD",
        ibuPekerjaan: "",
        ibuPenghasilan: "",
        ibuNoTlp: "",
      });
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  useEffect(() => {
    if (parents) {
      setFormData({
        userId: parents?.userid,
        ayahNik: parents?.nik_ayah,
        ayahNama: parents?.nama_ayah,
        ayahTempatLahir: parents?.lahir_ayah,
        ayahTanggalLahir: parents?.tanggal_ayah
          ? formatDate(parents?.tanggal_ayah)
          : "",
        ayahPendidikan: parents?.pendidikan_ayah
          ? parents?.pendidikan_ayah
          : "SD",
        ayahPekerjaan: parents?.pekerjaan_ayah,
        ayahPenghasilan: parents?.penghasilan_ayah
          ? formatCurrency(parents?.penghasilan_ayah)
          : 0,
        ayahNoTlp: parents?.tlp_ayah,
        ibuNik: parents?.nik_ibu,
        ibuNama: parents?.nama_ibu,
        ibuTempatLahir: parents?.lahir_ibu,
        ibuTanggalLahir: parents?.tanggal_ibu
          ? formatDate(parents?.tanggal_ibu)
          : "",
        ibuPendidikan: parents?.pendidikan_ibu ? parents?.pendidikan_ibu : "SD",
        ibuPekerjaan: parents?.pekerjaan_ibu,
        ibuPenghasilan: parents?.penghasilan_ibu
          ? formatCurrency(parents?.penghasilan_ibu)
          : 0,
        ibuNoTlp: parents?.tlp_ibu,
      });
    }
  }, [parents]);

  return (
    <Box sx={{ mt: 1 }}>
      <form className="formulir" onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar>
            <PersonIcon />
          </Avatar>

          <Typography variant="h6">Data Ayah</Typography>
        </Box>

        <TextField
          required
          label="NIK"
          size="small"
          name="ayahNik"
          value={formData.ayahNik}
          onChange={handleInputChange}
        />

        <TextField
          required
          label="Nama Ayah"
          size="small"
          name="ayahNama"
          value={formData.ayahNama}
          onChange={handleInputChange}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            required
            label="Tempat Lahir"
            size="small"
            name="ayahTempatLahir"
            value={formData.ayahTempatLahir}
            onChange={handleInputChange}
          />
          <TextField
            type="date"
            required
            label="Tanggal Lahir"
            size="small"
            name="ayahTanggalLahir"
            value={formData.ayahTanggalLahir}
            onChange={handleInputChange}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>

        <FormControl size="small">
          <InputLabel>Pendidikan</InputLabel>
          <Select
            name="ayahPendidikan"
            label="Pendidikan"
            value={formData.ayahPendidikan}
            onChange={handleInputChange}
          >
            <MenuItem value="SD">SD</MenuItem>
            <MenuItem value="SMP Sederajat">SMP Sederajat</MenuItem>
            <MenuItem value="SMA Sederajat">SMA Sederajat</MenuItem>
            <MenuItem value="D1">D1</MenuItem>
            <MenuItem value="D2">D2</MenuItem>
            <MenuItem value="D3">D3</MenuItem>
            <MenuItem value="S1">S1</MenuItem>
            <MenuItem value="S2">S2</MenuItem>
            <MenuItem value="S3">S3</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required
          label="Pekerjaan"
          size="small"
          name="ayahPekerjaan"
          value={formData.ayahPekerjaan}
          onChange={handleInputChange}
        />

        <TextField
          required
          label="Penghasilan"
          size="small"
          name="ayahPenghasilan"
          slotProps={{ inputLabel: { shrink: true } }}
          value={formData.ayahPenghasilan}
          onChange={handleCurrencyChange}
        />

        <TextField
          type="number"
          required
          label="No TLP"
          size="small"
          name="ayahNoTlp"
          value={formData.ayahNoTlp}
          onChange={handleInputChange}
        />

        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar>
            <PersonIcon />
          </Avatar>

          <Typography variant="h6">Data Ibu</Typography>
        </Box>

        <TextField
          required
          label="NIK"
          size="small"
          name="ibuNik"
          value={formData.ibuNik}
          onChange={handleInputChange}
        />

        <TextField
          required
          label="Nama Ibu"
          size="small"
          name="ibuNama"
          value={formData.ibuNama}
          onChange={handleInputChange}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            required
            label="Tempat Lahir"
            size="small"
            name="ibuTempatLahir"
            value={formData.ibuTempatLahir}
            onChange={handleInputChange}
          />
          <TextField
            type="date"
            required
            label="Tanggal Lahir"
            size="small"
            name="ibuTanggalLahir"
            value={formData.ibuTanggalLahir}
            onChange={handleInputChange}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Box>

        <FormControl size="small">
          <InputLabel>Pendidikan</InputLabel>
          <Select
            name="ibuPendidikan"
            label="Pendidikan"
            value={formData.ibuPendidikan}
            onChange={handleInputChange}
          >
            <MenuItem value="SD">SD</MenuItem>
            <MenuItem value="SMP Sederajat">SMP Sederajat</MenuItem>
            <MenuItem value="SMA Sederajat">SMA Sederajat</MenuItem>
            <MenuItem value="D1">D1</MenuItem>
            <MenuItem value="D2">D2</MenuItem>
            <MenuItem value="D3">D3</MenuItem>
            <MenuItem value="S1">S1</MenuItem>
            <MenuItem value="S2">S2</MenuItem>
            <MenuItem value="S3">S3</MenuItem>
          </Select>
        </FormControl>

        <TextField
          required
          label="Pekerjaan"
          size="small"
          name="ibuPekerjaan"
          value={formData.ibuPekerjaan}
          onChange={handleInputChange}
        />

        <TextField
          required
          label="Penghasilan"
          size="small"
          name="ibuPenghasilan"
          slotProps={{ inputLabel: { shrink: true } }}
          value={formData.ibuPenghasilan}
          onChange={handleCurrencyChange}
        />

        <TextField
          type="number"
          required
          label="No TLP"
          size="small"
          name="ibuNoTlp"
          value={formData.ibuNoTlp}
          onChange={handleInputChange}
        />

        <Box alignSelf="end">
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            color="success"
            type="submit"
          >
            {isLoading ? <CircularProgress size={24} /> : " Simpan"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Parents;
