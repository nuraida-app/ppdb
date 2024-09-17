import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetRegenciesQuery,
  useGetVillagesQuery,
} from "../api/service/areaApi";
import {
  useAddSchoolMutation,
  useGetSchoolFromQuery,
} from "../api/service/formApi";
import "./styles.css";

const School = () => {
  const { user } = useSelector((state) => state.user);
  const { data: sekolah } = useGetSchoolFromQuery(user?.id, {
    skip: !user?.id,
  });
  const [addSchool, { data, isSuccess, isLoading, error, reset }] =
    useAddSchoolMutation();

  const [npsn, setNpsn] = useState("");
  const [name, setName] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [regionId, setRegionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [villageId, setVillageId] = useState("");

  const [selectedProvince, setSelectedProvince] = useState({
    id: "",
    nama: "",
  });
  const [selectedRegion, setSelectedRegion] = useState({ id: "", nama: "" });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: "",
    nama: "",
  });
  const [selectedVillage, setSelectedVillage] = useState({ id: "", nama: "" });

  const { data: provinces } = useGetProvincesQuery();
  const { data: regencies } = useGetRegenciesQuery(provinceId, {
    skip: !provinceId,
  });
  const { data: districts } = useGetDistrictsQuery(regionId, {
    skip: !regionId,
  });
  const { data: villages } = useGetVillagesQuery(districtId, {
    skip: !districtId,
  });

  const handleProvinceChange = (e) => {
    const id = e.target.value;
    const name = provinces.find((item) => item.id === id)?.nama || "";
    setSelectedProvince({ id, nama: name });
    setProvinceId(id);
  };

  const handleRegionChange = (e) => {
    const id = e.target.value;
    const name = regencies.find((item) => item.id.trim() === id)?.nama || "";
    setSelectedRegion({ id, nama: name });
    setRegionId(id);
  };

  const handleDistrictChange = (e) => {
    const id = e.target.value;
    const name = districts.find((item) => item.id.trim() === id)?.nama || "";
    setSelectedDistrict({ id, nama: name });
    setDistrictId(id);
  };

  const handleVillageChange = (e) => {
    const id = e.target.value;
    const name = villages.find((item) => item.id.trim() === id)?.nama || "";
    setSelectedVillage({ id, nama: name });
    setVillageId(id);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addSchool({
      userId: user?.id,
      npsn,
      name,
      provinsi: selectedProvince.nama,
      provinsi_id: selectedProvince.id,
      regional: selectedRegion.nama,
      regional_id: selectedRegion.id,
      kecamatan: selectedDistrict.nama,
      kec_id: selectedDistrict.id,
      desa: selectedVillage.nama,
      desa_id: selectedVillage.id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setNpsn("");
      setName("");
      setSelectedProvince({ id: "", nama: "" });
      setSelectedRegion({ id: "", nama: "" });
      setSelectedDistrict({ id: "", nama: "" });
      setSelectedVillage({ id: "", nama: "" });
      setProvinceId("");
      setRegionId("");
      setDistrictId("");
      setVillageId("");
    }
    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, error, data, reset]);

  useEffect(() => {
    if (sekolah) {
      setNpsn(sekolah?.npsn);
      setName(sekolah?.nama_sekolah);
      setProvinceId(sekolah?.provinsi_id_sekolah);
      setSelectedProvince({
        id: sekolah?.provinsi_id_sekolah,
        nama: sekolah?.provinsi_sekolah,
      });

      setRegionId(sekolah?.regional_id_sekolah);
      setSelectedRegion({
        id: sekolah?.regional_id_sekolah,
        nama: sekolah?.regional_sekolah,
      });

      setDistrictId(sekolah?.kec_id_sekolah?.trim());
      setSelectedDistrict({
        id: sekolah?.kec_id_sekolah,
        nama: sekolah?.kec_sekolah,
      });

      setVillageId(sekolah?.desa_id_sekolah?.trim());
      setSelectedVillage({
        id: sekolah?.desa_id_sekolah?.trim(),
        nama: sekolah?.desa_sekolah,
      });
    }
  }, [sekolah]);

  return (
    <Box sx={{ mt: 1 }}>
      <form className="formulir" onSubmit={submitHandler}>
        <TextField
          label="NPSN"
          size="small"
          value={npsn || ""}
          onChange={(e) => setNpsn(e.target.value)}
        />
        <TextField
          label="Nama Sekolah Asal"
          size="small"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl size="small">
          <InputLabel>Provinsi</InputLabel>
          <Select
            value={provinceId || ""}
            label="Provinsi"
            onChange={handleProvinceChange}
          >
            {provinces?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.nama}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Kota / Kabupaten</InputLabel>
          <Select
            value={regionId || ""}
            label="Kota / Kabupaten"
            onChange={handleRegionChange}
          >
            {regencies?.map((item) => (
              <MenuItem value={item.id} key={item.id}>
                {item.nama}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Kecamatan</InputLabel>
          <Select
            value={districtId || ""}
            label="Kecamatan"
            onChange={handleDistrictChange}
          >
            {districts?.map((item) => (
              <MenuItem value={item.id.trim()} key={item.id}>
                {item.nama}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl size="small">
          <InputLabel>Desa / Kelurahan</InputLabel>
          <Select
            value={villageId || ""}
            label="Desa / Kelurahan"
            onChange={handleVillageChange}
          >
            {villages?.map((item) => (
              <MenuItem value={item.id.trim()} key={item.id.trim()}>
                {item.nama}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box alignSelf="end">
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ textTransform: "none" }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Simpan"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default School;
