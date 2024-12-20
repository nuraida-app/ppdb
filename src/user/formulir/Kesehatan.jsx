import React from "react";
import Layout from "../../components/Layout";

const Kesehatan = () => {
  return (
    <Layout>
      <div className="d-flex flex-column mb-3 py-2 border-bottom">
        <h5 className="m-0">Catatan Kesehatan</h5>
        <p className="text-secondary fst-italic">
          Pilih list gangguan kesehatan yang dialami calon siswa <br />
          Jika tidak ada, tidak perlu diisi
        </p>
      </div>

      <div className="row g-2">
        <div className="col-md-10 col-12">
          <select
            className="form-select"
            aria-label="Default select example"
            name="catatan"
          >
            <option value="default">Pilih Ganguan Kesehatan</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="col-md-2 col-12 text-md-start text-end">
          <button className="btn btn-primary">Tambah</button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Ganguan Kesehatan</th>
            <th scope="col">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td style={{ textAlign: "start" }}>Anemia</td>
            <td>
              <button className="btn btn-danger">Hapus</button>
            </td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td style={{ textAlign: "start" }}>Hipertensi</td>
            <td>
              <button className="btn btn-danger">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </Layout>
  );
};

export default Kesehatan;
