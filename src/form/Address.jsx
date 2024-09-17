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
import React, { useEffect, useState } from "react";
import {
  useGetDistrictsQuery,
  useGetProvincesQuery,
  useGetRegenciesQuery,
  useGetVillagesQuery,
} from "../api/service/areaApi";
import { useSelector } from "react-redux";
import {
  useAddAddressMutation,
  useGetAddressFromQuery,
} from "../api/service/formApi";
import { toast } from "react-toastify";

const Address = () => {
  const { user } = useSelector((state) => state.user);

  const { data: alamat } = useGetAddressFromQuery(user?.id, {
    skip: !user?.id,
  });
  const [addAddress, { data, isSuccess, isLoading, error, reset }] =
    useAddAddressMutation();

  const [indo, setIndo] = useState(true);
  const [country, setCountry] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [regionId, setRegionId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [villageId, setVillageId] = useState("");
  const [address, setAddress] = useState("");
  const [rtRw, setRtRw] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [distance, setDistance] = useState("");
  const [minutes, setMinutes] = useState("");
  const [transport, setTransport] = useState("Jalan Kaki");

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

  const handleSave = () => {
    const data = {
      userId: user.id,
      negara: indo ? "Indonesia" : country,
      provinsi_id: selectedProvince.id,
      provinsi: selectedProvince.nama,
      regional_id: selectedRegion.id.trim(),
      regional: selectedRegion.nama,
      kec_id: selectedDistrict.id.trim(),
      kecamatan: selectedDistrict.nama,
      desa_id: selectedVillage.id?.trim(),
      desa: selectedVillage.nama,
      alamat: address,
      rt_rw: rtRw ? rtRw : null,
      kode_pos: postalCode ? postalCode : null,
      jarak: distance,
      menit: minutes,
      transportasi: transport,
    };

    addAddress(data);
    // console.log(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      setCountry("");
      setProvinceId("");
      setRegionId("");
      setDistrictId("");
      setVillageId("");
      setAddress("");
      setRtRw("");
      setPostalCode("");
      setDistance("");
      setMinutes("");
      setTransport("");
      setSelectedProvince("");
      setSelectedRegion("");
      setSelectedDistrict("");
      setSelectedVillage("");
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, data, error]);

  useEffect(() => {
    if (alamat) {
      if (alamat?.negara === "Indonesia") {
        setIndo(true);
      } else {
        setCountry(alamat?.negara);
      }
      setProvinceId(alamat?.provinsi_id);
      setSelectedProvince({ id: alamat?.provinsi_id, nama: alamat?.provinsi });
      setRegionId(alamat?.regional_id);
      setSelectedRegion({ id: alamat?.regional_id, nama: alamat?.regional });
      setDistrictId(alamat?.kec_id?.trim());
      setSelectedDistrict({
        id: alamat?.kec_id?.trim(),
        nama: alamat?.kecamatan,
      });
      setVillageId(alamat?.desa_id?.trim());
      setSelectedVillage({ id: alamat?.desa_id, nama: alamat?.desa });
      setAddress(alamat?.alamat);
      setRtRw(alamat?.rt_rw);
      setPostalCode(alamat?.kode_pos);
      setDistance(alamat?.jarak);
      setMinutes(alamat?.menit);
      setTransport(alamat?.transportasi);
    }
  }, [alamat]);

  return (
    <Box sx={{ mt: 1 }}>
      <form className="formulir">
        <FormControl size="small">
          <InputLabel>Negara</InputLabel>
          <Select value={indo} label="Negara" onChange={() => setIndo(!indo)}>
            <MenuItem value={true}>Indonesia</MenuItem>
            <MenuItem value={false}>Luar Negeri</MenuItem>
          </Select>
        </FormControl>

        {!indo && (
          <TextField
            label="Negara Asal"
            size="small"
            value={country || ""}
            onChange={(e) => setCountry(e.target.value)}
          />
        )}

        {indo && (
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
        )}

        {indo && (
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
        )}

        {indo && (
          <FormControl size="small">
            <InputLabel>Kecamatan</InputLabel>
            <Select
              value={districtId || ""}
              label="Kecamatan"
              onChange={handleDistrictChange}
            >
              {districts?.map((item) => (
                <MenuItem value={item.id.trim()} key={item.id.trim()}>
                  {item.nama}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {indo && (
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
        )}

        <TextField
          required
          label="Alamat"
          size="small"
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          {indo && (
            <TextField
              label="RT / Rw"
              size="small"
              value={rtRw || ""}
              onChange={(e) => setRtRw(e.target.value)}
            />
          )}

          <TextField
            label="Kode Pos"
            size="small"
            value={postalCode || ""}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <TextField
            label="Jarak Ke Sekolah"
            size="small"
            value={distance || ""}
            onChange={(e) => setDistance(e.target.value)}
          />

          <TextField
            label="Menit ke Sekolah"
            size="small"
            value={minutes || ""}
            onChange={(e) => setMinutes(e.target.value)}
          />

          <FormControl size="small">
            <InputLabel>Transportasi</InputLabel>
            <Select
              value={transport || ""}
              label="Transportasi"
              onChange={(e) => setTransport(e.target.value)}
            >
              <MenuItem value="Jalan Kaki">Jalan Kaki</MenuItem>
              <MenuItem value="Angkutan Umum">Angkutan Umum</MenuItem>
              <MenuItem value="Sepeda Motor">Sepeda Motor</MenuItem>
              <MenuItem value="Sepeda">Sepeda</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box alignSelf="end">
          <Button
            variant="contained"
            color="success"
            sx={{ textTransform: "none" }}
            onClick={handleSave}
          >
            {isLoading ? <CircularProgress size={24} /> : "Simpan"}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Address;
