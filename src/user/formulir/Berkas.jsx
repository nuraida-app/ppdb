import React from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useMyPaymentQuery } from "../../api/services/ApiPembayaran";
import NotAllowed from "../NotAllowed";

const labels = [
  { label: "Kartu keluarga", name: "kk" },
  { label: "Akta Kelahiran", name: "akta" },
  { label: "KTP Ayah", name: "ayah" },
  { label: "KTP Ibu", name: "ibu" },
  { label: "Ijazah / SKL", name: "ijskl" },
  { label: "Rapot", name: "rapot" },
];

const Berkas = () => {
  const { user } = useSelector((state) => state.user);
  const { data } = useMyPaymentQuery(user?.id, { skip: !user?.id });

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

      <div className="container d-flex flex-wrap gap-2 my-3">
        {labels.map((item, index) => (
          <button key={index} className={`btn btn-danger`}>
            {item.label}
          </button>
        ))}
      </div>

      {data?.key ? (
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
      ) : (
        <NotAllowed />
      )}
    </Layout>
  );
};

export default Berkas;
