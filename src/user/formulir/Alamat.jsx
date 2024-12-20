import React from "react";
import Layout from "../../components/Layout";

const Alamat = () => {
  return (
    <Layout>
      <h5 className="py-2 border-bottom">Alamat</h5>
      <div className="container row g-2">
        {/* Kolom kiri */}
        <div className="col-lg-6 col-12 py-2 d-flex flex-column gap-3">
          <select
            className="form-select"
            aria-label="Default select example"
            name="provinsi_id"
          >
            <option value="provinsi">Pilih Provinsi</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            name="kota_id"
          >
            <option value="kota">Kota / Kabupaten</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            name="kec_id"
          >
            <option value="kec">Kecamatan</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            name="desa_id"
          >
            <option value="ds">Desa</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>

          <textarea
            className="form-control"
            placeholder="Alamat"
            id="floatingTextarea2"
          ></textarea>
        </div>

        {/* Kolom kanan */}
        <div className="col-lg-6 col-12 py-2 d-flex flex-column gap-3">
          <input
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="Kode Pos"
          />

          <input
            type="number"
            className="form-control"
            id="floatingInput"
            placeholder="Jarak Ke sekolah"
          />

          <select
            className="form-select"
            aria-label="Default select example"
            name="transport"
          >
            <option value="ds">Transportasi</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </Layout>
  );
};

export default Alamat;
