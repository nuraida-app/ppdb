import React from "react";
import Layout from "../../components/Layout";

const labels = [
  { label: "NPSN", type: "number" },
  { label: "Nama Sekolah", type: "text" },
  { label: "Provinsi", type: "text" },
  { label: "Kota", type: "text" },
  { label: "Kecamatan", type: "text" },
  { label: "Desa", type: "text" },
];

const Fsekolah = () => {
  return (
    <Layout>
      <h5 className="py-2 border-bottom">Data Sekolah Sebelumnya</h5>

      <form action="" className="d-flex flex-column gap-2">
        {labels.map((item, index) => (
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
            />
          </div>
        ))}
      </form>
    </Layout>
  );
};

export default Fsekolah;
