import React, { useState } from "react";
import Layout from "../../components/Layout";

const labels = [
  { label: "NIK", type: "number" },
  { label: "Nama", type: "text" },
  { label: "Tempat Lahir", type: "text" },
  { label: "Tgl Lahir", type: "date" },
  { label: "Pendidikan", type: "text" },
  { label: "Pekerjaan", type: "text" },
  { label: "Penghasilan", type: "number" },
  { label: "No Tlp", type: "number" },
];

const Ortu = () => {
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
    console.log("Form Data:", formData); // Log form data to console
  };

  return (
    <Layout>
      <h5 className="py-2 border-bottom">Data Orang Tua</h5>

      <form onSubmit={handleSubmit} className="container row">
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
                onChange={handleChange}
              />
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-end">
          <button className="btn btn-primary" type="submit">
            Simpan
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Ortu;
