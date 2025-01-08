import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Alert from "../../components/Alert";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useMyPaymentQuery } from "../../api/services/ApiPembayaran";
import NotAllowed from "../NotAllowed";
import Protected from "../../components/Protected";
import { useGetLevelsMutation } from "../../api/services/ApiJenjang";
import { useGetSchoolsMutation } from "../../api/services/ApiSekolah";
import { useGetYearsQuery } from "../../api/services/ApiTapel";
import { MdSportsGolf } from "react-icons/md";
import {
  useAddStudentFormMutation,
  useGetFormQuery,
} from "../../api/services/ApiFrom";

const labels = [
  { label: "Nama Lengkap", type: "text" },
  { label: "Tempat Lahir", type: "text" },
  { label: "Tanggal Lahir", type: "date" },
  { label: "Agama", type: "text" },
  { label: "Anak Ke", type: "number" },
  { label: "Jml Saudara", type: "number" },
  { label: "No Akta", type: "text" },
  { label: "No KK", type: "text" },
  { label: "NIK", type: "text" },
  { label: "NISN", type: "text" },
  { label: "TB", type: "text" },
  { label: "BB", type: "text" },
  { label: "Lingkar Kepala", type: "text" },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid dates
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Biodata = () => {
  const { user } = useSelector((state) => state.user);
  const { data } = useMyPaymentQuery(user?.id, { skip: !user?.id });
  const { data: detail } = useGetFormQuery(user?.id, { skip: !user?.id });

  const [getLevels, { data: grades = {} }] = useGetLevelsMutation();
  const { levels = [] } = grades;
  const [getSchools, { data: schoolsData = {} }] = useGetSchoolsMutation();
  const { schools = [] } = schoolsData;
  const { data: years } = useGetYearsQuery();

  const [addStudentForm, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddStudentFormMutation();

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.Jenjang === "default" ||
      formData.sekolah === "default" ||
      formData.kelamin === "default"
    ) {
      toast.warning("data harus diisi");
    }
    addStudentForm({ body: formData, userId: user?.id });
  };

  useEffect(() => {
    getLevels(1, 100);
    getSchools(1, 100);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
    }
    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error]);

  useEffect(() => {
    if (detail) {
      setFormData({
        tapel: detail?.tapel_id,
        jenjang: detail?.jenjang_id,
        sekolah: detail?.sekolah_id,
        kelamin: detail?.kelamin,
        nama_lengkap: detail?.nama,
        tempat_lahir: detail?.tempat_lahir,
        tanggal_lahir: formatDate(detail?.tanggal_lahir),
        agama: detail?.agama,
        anak_ke: detail?.anak_ke,
        jml_saudara: detail?.jml_saudara,
        no_akta: detail?.no_akta,
        no_kk: detail?.no_kk,
        nik: detail?.nik,
        nisn: detail?.nisn,
        tb: detail?.tinggi,
        bb: detail?.berat,
        lingkar_kepala: detail?.kepala,
      });
    }
  }, [detail]);

  return (
    <Layout>
      <h5 className="py-2 border-bottom">Data Diri Calon Siswa</h5>

      {data?.ket ? (
        <form onSubmit={handleSubmit} action="" className="row">
          <div className="col-md-6 col-sm-12 d-flex flex-column gap-3 py-2">
            <select
              className="form-select"
              aria-label="Default select example"
              name="tapel"
              value={formData.tapel || "default"}
              onChange={handleChange}
            >
              <option value="default">Tahun Pelajaran</option>
              {years?.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.tapel}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              aria-label="Default select example"
              name="jenjang"
              value={formData.jenjang || "default"}
              onChange={handleChange}
            >
              <option value="default">Pilih Jenjang</option>
              {levels?.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.nama}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              aria-label="Default select example"
              name="sekolah"
              value={formData.sekolah || "default"}
              onChange={handleChange}
            >
              <option value="default">Pilih Sekolah</option>
              {schools?.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.nama}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              aria-label="Default select example"
              name="kelamin"
              value={formData.kelamin}
              onChange={handleChange}
            >
              <option value="default">Jenis Kelamin</option>
              <option value="f">Perempuan</option>
              <option value="m">Laki Laki</option>
            </select>

            {labels.slice(0, 5).map((item, index) => (
              <div key={index} className="input-group ">
                <span
                  style={{ width: 130 }}
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  {item.label}
                </span>
                <input
                  name={item.label.replace(/\s+/g, "_").toLocaleLowerCase()}
                  type={item.type}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  required
                  value={
                    formData[
                      item.label.replace(/\s+/g, "_").toLocaleLowerCase()
                    ] || ""
                  }
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="col-md-6 col-sm-12 d-flex flex-column gap-3 py-2">
            {labels.slice(5, 14).map((item, index) => (
              <div key={index} className="input-group ">
                <span
                  style={{ width: 130 }}
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  {item.label}
                </span>
                <input
                  name={item.label.replace(/\s+/g, "_").toLocaleLowerCase()}
                  type={item.type}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  required
                  value={
                    formData[
                      item.label.replace(/\s+/g, "_").toLocaleLowerCase()
                    ] || ""
                  }
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary">
              {isLoading ? (
                <div class="spinner-border text-light" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Simpan"
              )}
            </button>
          </div>
        </form>
      ) : (
        <NotAllowed />
      )}
    </Layout>
  );
};

export default Biodata;
