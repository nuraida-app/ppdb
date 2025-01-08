import React from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useMyPaymentQuery } from "../../api/services/ApiPembayaran";
import NotAllowed from "../NotAllowed";

const labels = [
  { label: "NPSN", type: "number" },
  { label: "Nama Sekolah", type: "text" },
  { label: "Provinsi", type: "text" },
  { label: "Kota", type: "text" },
  { label: "Kecamatan", type: "text" },
  { label: "Desa", type: "text" },
];

const Fsekolah = () => {
  const { user } = useSelector((state) => state.user);
  const { data } = useMyPaymentQuery(user?.id, { skip: !user?.id });

  return (
    <Layout>
      <h5 className="py-2 border-bottom">Data Sekolah Sebelumnya</h5>

      {data?.key ? (
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
      ) : (
        <NotAllowed />
      )}
    </Layout>
  );
};

export default Fsekolah;
