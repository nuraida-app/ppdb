import React, { useState } from "react";
import Layout from "../../components/Layout";

const Keluarga = () => {
  const usersData = [
    { id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
    { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
    { id: 3, first: "Larry", last: "Bird", handle: "@twitter" },
    { id: 4, first: "John", last: "Doe", handle: "@jdoe" },
    { id: 5, first: "Jane", last: "Smith", handle: "@jsmith" },
    { id: 6, first: "Chris", last: "Evans", handle: "@cevans" },
    { id: 7, first: "Emily", last: "Clark", handle: "@eclark" },
    { id: 8, first: "Michael", last: "Scott", handle: "@mscott" },
    { id: 9, first: "Pam", last: "Beesly", handle: "@pbeesly" },
    { id: 10, first: "Dwight", last: "Schrute", handle: "@dschrute" },
    { id: 11, first: "Jim", last: "Halpert", handle: "@jhalpert" },
    { id: 12, first: "Kelly", last: "Kapoor", handle: "@kkapoor" },
    { id: 13, first: "Stanley", last: "Hudson", handle: "@shudson" },
    { id: 14, first: "Oscar", last: "Martinez", handle: "@omartinez" },
    { id: 15, first: "Angela", last: "Martin", handle: "@amartin" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate pagination details
  const totalPages = Math.ceil(usersData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentUsers = usersData.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when rows per page change
  };

  return (
    <Layout>
      <div className="container-fluid">
        <div className="col-12 col-lg-auto py-2 mb-lg-0 me-lg-3 d-flex align-items-center justify-content-between border-bottom">
          <h5 className="py-2 m-0">Data Keluarga</h5>
          <button
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#keluarga"
          >
            Tambah
          </button>

          <div
            className="modal fade"
            id="keluarga"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Tambah Anggota Keluarga
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form action="" className="d-flex flex-column gap-2">
                    <div className="input-group ">
                      <span
                        style={{ width: 130 }}
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Nama Lengkap
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        required
                      />
                    </div>

                    <div className="input-group ">
                      <span
                        style={{ width: 130 }}
                        className="input-group-text"
                        id="inputGroup-sizing-default"
                      >
                        Tanggal Lahir
                      </span>
                      <input
                        type="date"
                        className="form-control"
                        aria-label="Sizing example input"
                        aria-describedby="inputGroup-sizing-default"
                        required
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Tutup
                  </button>
                  <button type="button" className="btn btn-primary">
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-striped table-hover mt-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama</th>
              <th scope="col">Tanggal Lahir</th>
              <th scope="col">Usia</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{startIndex + index + 1}</th>
                <td>{user.first}</td>
                <td>{user.last}</td>
                <td>{user.handle}</td>
                <td>
                  <button className="btn btn-danger">hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Keluarga;
