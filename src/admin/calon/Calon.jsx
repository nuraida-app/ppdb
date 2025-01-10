import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import Layout from "../../components/Layout";
import { useGetFormQuery } from "../../api/services/ApiFrom";
import { useParams } from "react-router-dom";
import Formulir from "./Formulir";

const Calon = () => {
  const params = useParams();
  const id = params.userid;

  const { data, error } = useGetFormQuery(id);

  const areaRef = useRef();

  const handleDownload = () => {
    const element = areaRef.current;
    const options = {
      margin: 10,
      filename: `${data?.formulir.nama}-formulir.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-12">
            <div className="border border-secondary rounded p-2">
              <div className="text-end">
                <button className="btn btn-success" onClick={handleDownload}>
                  <i className="bi bi-printer-fill"></i> Print
                </button>
              </div>

              <div className="d-flex flex-column" ref={areaRef}>
                {/* Kop */}
                <div className="container d-flex align-items-center gap-1">
                  <img src="/logo.png" alt="logo" height={90} width={90} />
                  <div className="text-start mx-2">
                    <p className="fw-bold">YAYASAN IZZATUL MUHSININ</p>
                    <p className="fw-bold">NURAIDA ISLAMIC BOARDING SCHOOL</p>
                    <p style={{ fontSize: 12 }} className="fw-light">
                      Membina Generasi Rabbani, Berprestasi Menuju Ridho Illahi
                    </p>
                    <p style={{ fontSize: 12 }} className="fw-light">
                      Jl Guru Mukhtar No 01 03/03 Kp Petir Kel Cimahpar Kec
                      Bogor Utara Kota Bogor
                    </p>
                  </div>
                </div>

                <hr />

                {/* Formulir */}
                <Formulir data={data?.formulir} />
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-12">sadasd</div>
        </div>
      </div>
    </Layout>
  );
};

export default Calon;
