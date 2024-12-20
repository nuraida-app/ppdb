import React from "react";
import Layout from "../../components/Layout";

const labels = [
  { label: "kartu keluarga", name: "kk" },
  { label: "Akta Kelahiran", name: "akta" },
  { label: "KTP Ayah", name: "ayah" },
  { label: "KTP Ibu", name: "ibu" },
  { label: "Ijazah / SKL", name: "ijskl" },
  { label: "Rapot", name: "rapot" },
];

const Berkas = () => {
  return (
    <Layout>
      <div className="container d-flex flex-column py-2 border-bottom mb-3">
        <h5 className="m-0">Upload Berkas</h5>
        <p className="text-secondary fst-italic">
          Pastikan berkas yang diupload sesuai dengan ketentuan <br />
          Semua file <strong>WAJIB SCAN PDF</strong>, Foto{" "}
          <strong>JPG / JPEG / PNG</strong>
        </p>
      </div>

      <div className="container d-flex gap-2 my-3">
        {labels.map((item, index) => (
          <button key={index} className={`btn btn-danger`}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="container d-flex flex-column gap-2">
        {labels.map((item, index) => (
          <div key={index}>
            <label htmlFor="kk" className="form-label">
              {item.label}
            </label>
            <input
              type="file"
              className="form-control"
              id={item.name}
              name={item.name}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Berkas;
