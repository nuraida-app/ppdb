import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useMyPaymentQuery } from "../../api/services/ApiPembayaran";
import NotAllowed from "../NotAllowed";
import {
  useAddSchoolMutation,
  useGetFormQuery,
} from "../../api/services/ApiFrom";
import { toast } from "react-toastify";

const labels = [
  { label: "NPSN", type: "text" },
  { label: "Nama Sekolah", type: "text" },
  { label: "Provinsi", type: "text" },
  { label: "Kota", type: "text" },
  { label: "Kecamatan", type: "text" },
  { label: "Desa", type: "text" },
];

const Fsekolah = () => {
  const { user } = useSelector((state) => state.user);
  const { data } = useMyPaymentQuery(user?.id, { skip: !user?.id });
  const { data: rowData } = useGetFormQuery(user?.id, { skip: !user?.id });
  const school = rowData?.school;

  const [addSchool, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddSchoolMutation();

  const [formValues, setFormValues] = useState(
    labels.reduce((acc, item) => {
      acc[item.label.replace(/\s+/g, "_").toLowerCase()] = "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSchool(formValues);
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
    if (school) {
      setFormValues({
        npsn: school.npsn || "",
        nama_sekolah: school.nama || "",
        provinsi: school.provinsi || "",
        kota: school.kota || "",
        kecamatan: school.kecamatan || "",
        desa: school.desa || "",
      });
    }
  }, [school]);

  return (
    <Layout>
      <h5 className="py-2 border-bottom">Data Sekolah Sebelumnya</h5>

      {data?.ket ? (
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          {labels.map((item, index) => (
            <div key={index} className="input-group">
              <span
                style={{ width: 130 }}
                className="input-group-text"
                id="inputGroup-sizing-default"
              >
                {item.label}
              </span>
              <input
                name={item.label.replace(/\s+/g, "_").toLowerCase()}
                type={item.type}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                value={
                  formValues[item.label.replace(/\s+/g, "_").toLowerCase()]
                }
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      ) : (
        <NotAllowed />
      )}
    </Layout>
  );
};

export default Fsekolah;
