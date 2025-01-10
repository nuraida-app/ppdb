import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useMyPaymentQuery } from "../../api/services/ApiPembayaran";
import NotAllowed from "../NotAllowed";
import {
  useAddParentsMutation,
  useGetFormQuery,
} from "../../api/services/ApiFrom";
import { toast } from "react-toastify";

const labels = [
  { label: "NIK", type: "text" },
  { label: "Nama", type: "text" },
  { label: "Tempat Lahir", type: "text" },
  { label: "Tanggal Lahir", type: "date" },
  { label: "Pendidikan", type: "text" },
  { label: "Pekerjaan", type: "text" },
  { label: "No Tlp", type: "number" },
];

const convertPhoneNumber = (phone) => {
  if (phone?.startsWith("0")) {
    return `62${phone.slice(1)}`;
  }
  return phone;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return new Date(); // Handle invalid dates
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Ortu = () => {
  const { user } = useSelector((state) => state.user);
  const { data } = useMyPaymentQuery(user?.id, { skip: !user?.id });
  const { data: rowData } = useGetFormQuery(user?.id, { skip: !user?.id });
  const detail = rowData?.formulir;

  const [addParents, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddParentsMutation();

  const today = formatDate(new Date());

  const [formData, setFormData] = useState({
    ayah_nama: "",
    ayah_nik: "",
    ayah_tempat_lahir: "",
    ayah_tanggal_lahir: today,
    ayah_pendidikan: "",
    ayah_pekerjaan: "",
    ayah_no_tlp: "",
    ibu_nama: "",
    ibu_nik: "",
    ibu_tempat_lahir: "",
    ibu_tanggal_lahir: today,
    ibu_pendidikan: "",
    ibu_pekerjaan: "",
    ibu_no_tlp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const processedFormData = {
      ...formData,
      ayah_no_tlp: convertPhoneNumber(formData.ayah_no_tlp),
      ibu_no_tlp: convertPhoneNumber(formData.ibu_no_tlp),
    };

    console.log(processedFormData);

    addParents({ body: processedFormData, userId: user?.id });
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
  }, [msg, isSuccess, error]);

  useEffect(() => {
    if (detail) {
      setFormData((prevState) => ({
        ...prevState,
        ayah_nama: detail.ayah_nama || "",
        ayah_nik: detail.ayah_nik || "",
        ayah_tempat_lahir: detail.ayah_tempat_lahir || "",
        ayah_tanggal_lahir: detail.ayah_tanggal_lahir
          ? formatDate(detail.ayah_tanggal_lahir)
          : today,
        ayah_pendidikan: detail.ayah_pendidikan || "",
        ayah_pekerjaan: detail.ayah_pekerjaan || "",
        ayah_no_tlp: detail.ayah_no_tlp || "",
        ibu_nama: detail.ibu_nama || "",
        ibu_nik: detail.ibu_nik || "",
        ibu_tempat_lahir: detail.ibu_tempat_lahir || "",
        ibu_tanggal_lahir: detail.ibu_tanggal_lahir
          ? formatDate(detail.ibu_tanggal_lahir)
          : today,
        ibu_pendidikan: detail.ibu_pendidikan || "",
        ibu_pekerjaan: detail.ibu_pekerjaan || "",
        ibu_no_tlp: detail.ibu_no_tlp || "",
      }));
    }
  }, [detail]);

  console.log(detail);

  return (
    <Layout>
      <h5 className="py-2 border-bottom">Data Orang Tua</h5>

      {data?.ket ? (
        <form onSubmit={handleSubmit} className="row">
          <div className="col-md-6 col-sm-12 d-flex flex-column gap-3 py-2">
            <h6>Ayah</h6>
            {labels.map((item, index) => (
              <div key={`ayah_${index}`} className="input-group">
                <span
                  style={{ width: 130 }}
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  {item.label}
                </span>
                <input
                  name={`ayah_${item.label.replace(/\s+/g, "_").toLowerCase()}`}
                  type={item.type}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  required
                  value={
                    formData[
                      `ayah_${item.label.replace(/\s+/g, "_").toLowerCase()}` ||
                        ""
                    ]
                  }
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div className="col-md-6 col-sm-12 d-flex flex-column gap-3 py-2">
            <h6>Ibu</h6>
            {labels.map((item, index) => (
              <div key={`ibu_${index}`} className="input-group">
                <span
                  style={{ width: 130 }}
                  className="input-group-text"
                  id="inputGroup-sizing-default"
                >
                  {item.label}
                </span>
                <input
                  name={`ibu_${item.label.replace(/\s+/g, "_").toLowerCase()}`}
                  type={item.type}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                  required
                  value={
                    formData[
                      `ibu_${item.label.replace(/\s+/g, "_").toLowerCase()}`
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

export default Ortu;
