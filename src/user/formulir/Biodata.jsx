import React, { useState } from "react";
import Layout from "../../components/Layout";
import Alert from "../../components/Alert";

const labels = [
  { label: "Nama Lengkap", type: "text" },
  { label: "Tempat Lahir", type: "text" },
  { label: "Tanggal Lahir", type: "date" },
  { label: "Jenis Kelamin", type: "text" },
  { label: "Agama", type: "text" },
  { label: "Anak Ke-", type: "number" },
  { label: "Jml Saudara", type: "number" },
  { label: "No Akta", type: "number" },
  { label: "No KK", type: "number" },
  { label: "NIK", type: "number" },
  { label: "NISN", type: "number" },
  { label: "TB", type: "number" },
  { label: "BB", type: "number" },
  { label: "Lingkar Kepala", type: "number" },
];

const Biodata = () => {
  const [alert, setAlert] = useState(false);

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
    if (formData.Jenjang === "jenjang") {
      setAlert(true);
    }
    console.log("Form Data:", formData); // Log form data to console
  };

  return (
    <Layout>
      {alert && (
        <Alert
          close={() => setAlert(false)}
          className={"alert-danger"}
          message={"Jenjang Wajib dipilih"}
        />
      )}
      <h5 className="py-2 border-bottom">Data Diri Calon Siswa</h5>

      <form onSubmit={handleSubmit} action="" className="container row">
        <div className="col-md-6 col-sm-12 d-flex flex-column gap-3 py-2">
          <select
            className="form-select"
            aria-label="Default select example"
            name="Jenjang"
            value={formData.Jenjang}
            onChange={handleChange}
          >
            <option value="jenjang">Pilih Jenjang</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          {labels.slice(0, 6).map((item, index) => (
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
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="col-md-6 col-sm-12 d-flex flex-column gap-3 py-2">
          {labels.slice(7, 14).map((item, index) => (
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
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Simpan</button>
        </div>
      </form>
    </Layout>
  );
};

export default Biodata;
