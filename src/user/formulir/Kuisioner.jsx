import React from "react";
import Layout from "../../components/Layout";

const Kuisioner = () => {
  return (
    <Layout>
      <div className="d-flex flex-column mb-3 border-bottom py-3">
        <h5 className="m-0">Kuisioner & Penjadwalan</h5>
        <p className="">Pastikan kuisioner diisi sesuai dengan Pengisi </p>
      </div>

      <select
        className="form-select"
        aria-label="Default select example"
        name="Jenjang"
      >
        <option value="default">Pilih jadwal Tes</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>

      <div className="container-lg my-3">
        <label htmlFor="ortu">Pengisi: Orang Tua</label>
        <table id="ortu" className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: 80 }}>
                No
              </th>
              <th scope="col">Pertanyaan</th>
              <th scope="col" style={{ width: 80 }}>
                Ya
              </th>
              <th scope="col" style={{ width: 80 }}>
                Tidak
              </th>
            </tr>
          </thead>
          <tbody>
            <th scope="row">1</th>
            <td style={{ textAlign: "start" }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque fugiat aliquid, iste odio repellendus veniam tenetur.
              Excepturi veritatis laudantium, corrupti suscipit voluptas beatae
              tempore sapiente quos, quam atque est nemo.
            </td>
            <td>
              <input
                type="checkbox"
                name="1"
                id="1"
                className="form-check-input"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="2"
                id="2"
                className="form-check-input"
              />
            </td>
          </tbody>
        </table>
      </div>

      <div className="container mb-3">
        <label htmlFor="siswa">Pengisi: Calon Siswa</label>
        <table id="siswa" className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col" style={{ width: 80 }}>
                No
              </th>
              <th scope="col">Pertanyaan</th>
              <th scope="col" style={{ width: 80 }}>
                Ya
              </th>
              <th scope="col" style={{ width: 80 }}>
                Tidak
              </th>
            </tr>
          </thead>
          <tbody>
            <th scope="row">1</th>
            <td style={{ textAlign: "start" }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque fugiat aliquid, iste odio repellendus veniam tenetur.
              Excepturi veritatis laudantium, corrupti suscipit voluptas beatae
              tempore sapiente quos, quam atque est nemo.
            </td>
            <td>
              <input
                type="checkbox"
                name="1"
                id="1"
                className="form-check-input"
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="2"
                id="2"
                className="form-check-input"
              />
            </td>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Kuisioner;
