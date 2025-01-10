import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useMyPaymentQuery } from "../../api/services/ApiPembayaran";
import NotAllowed from "../NotAllowed";
import {
  useCitiesQuery,
  useDistrictsQuery,
  useProvincesQuery,
  useVillagesQuery,
} from "../../api/services/ApiWilayah";
import {
  useAddAddressMutation,
  useGetFormQuery,
} from "../../api/services/ApiFrom";
import { toast } from "react-toastify";
import BtnLoad from "../../components/BtnLoad";

const Alamat = () => {
  const { user } = useSelector((state) => state.user);
  const { data } = useMyPaymentQuery(user?.id, { skip: !user?.id });
  const { data: rowData } = useGetFormQuery(user?.id, { skip: !user?.id });
  const detail = rowData?.address;

  const [provinceId, setProvinceId] = useState("default");
  const [cityId, setCityId] = useState("default");
  const [districtId, setDistrictId] = useState("default");
  const [villageId, setVillageId] = useState("default");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [distance, setDistance] = useState("");
  const [media, setMedia] = useState("default");

  const { data: provinces } = useProvincesQuery();
  const { data: cities } = useCitiesQuery(provinceId, {
    skip: provinceId === "default",
  });
  const { data: districts } = useDistrictsQuery(cityId, {
    skip: cityId === "default",
  });
  const { data: villages } = useVillagesQuery(districtId, {
    skip: districtId === "default",
  });

  const [addAddress, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddAddressMutation();

  const saveHandler = (e) => {
    e.preventDefault();

    const data = {
      provinsi: provinces?.find((item) => item.id === provinceId)?.nama,
      kota: cities?.find((item) => item.id === cityId)?.nama,
      kecamatan: districts?.find((item) => item.id === districtId)?.nama,
      desa: villages?.find((item) => item.id === villageId)?.nama,
      alamat: address,
      kode_pos: postalCode,
      jarak: distance,
      media: media,
    };

    addAddress(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error, reset]);

  useEffect(() => {
    if (detail) {
      setProvinceId(
        provinces?.find((item) => item.nama === detail?.provinsi)?.id ||
          "default"
      );
    }
  }, [detail, provinces]);

  useEffect(() => {
    if (provinceId !== "default" && detail) {
      setCityId(
        cities?.find((item) => item.nama === detail?.kota)?.id || "default"
      );
    }
  }, [provinceId, cities, detail]);

  useEffect(() => {
    if (cityId !== "default" && detail) {
      setDistrictId(
        districts?.find((item) => item.nama === detail?.kecamatan)?.id ||
          "default"
      );
    }
  }, [cityId, districts, detail]);

  useEffect(() => {
    if (districtId !== "default" && detail) {
      setVillageId(
        villages?.find((item) => item.nama === detail?.desa)?.id || "default"
      );
      setAddress(detail?.alamat || "");
      setPostalCode(detail?.kode_pos || "");
      setDistance(detail?.jarak || "");
      setMedia(detail?.media || "default");
    }
  }, [districtId, villages, detail]);

  return (
    <Layout>
      <h5 className="py-2 border-bottom">Alamat</h5>
      {data?.ket ? (
        <form className="row" onSubmit={saveHandler}>
          {/* Kolom kiri */}
          <div className="col-lg-6 col-12 py-2 d-flex flex-column gap-3">
            <select
              className="form-select"
              aria-label="Default select example"
              name="provinsi_id"
              value={provinceId}
              onChange={(e) => setProvinceId(e.target.value)}
            >
              <option value="default">Pilih Provinsi</option>
              {provinces?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              aria-label="Default select example"
              name="kota_id"
              value={cityId}
              onChange={(e) => setCityId(e.target.value)}
            >
              <option value="default">Kota / Kabupaten</option>
              {cities?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              aria-label="Default select example"
              name="kec_id"
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
            >
              <option value="default">Kecamatan</option>
              {districts?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              aria-label="Default select example"
              name="desa_id"
              value={villageId}
              onChange={(e) => setVillageId(e.target.value)}
            >
              <option value="default">Desa</option>
              {villages?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>

            <textarea
              className="form-control"
              placeholder="Alamat"
              id="floatingTextarea2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          {/* Kolom kanan */}
          <div className="col-lg-6 col-12 py-2 d-flex flex-column gap-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Kode Pos"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />

            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Jarak Ke sekolah (tanpa km)"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
            />

            <select
              className="form-select"
              aria-label="Default select example"
              name="transport"
              value={media}
              onChange={(e) => setMedia(e.target.value)}
            >
              <option value="default">Transportasi</option>
              <option value="Mobil Pribadi">Mobil Pribadi</option>
              <option value="Motor">Motor</option>
              <option value="Angkutan Umum">Angkutan Umum</option>
              <option value="Jemputan">Jemputan</option>
              <option value="Jalan Kaki">Jalan Kaki</option>
              <option value="Sepeda">Sepeda</option>
            </select>
          </div>

          <div className="text-end">
            {isLoading ? (
              <BtnLoad />
            ) : (
              <button type="submit" className="btn btn-primary">
                Simpan
              </button>
            )}
          </div>
        </form>
      ) : (
        <NotAllowed />
      )}
    </Layout>
  );
};

export default Alamat;
