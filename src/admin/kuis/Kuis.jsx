import React, { useState } from "react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";
import Layout from "../../components/Layout";
import TableContainer from "../../components/TableContainer";
import ModalComponent from "../../components/ModalComponent";
import Editor from "./Editor";
import { useGetQuizzesQuery } from "../../api/services/ApiKuis";

const Kuis = () => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data = {} } = useGetQuizzesQuery({ page, limit, search });
  const { questions = [], totalPages } = data;

  return (
    <Layout>
      <div className="container-fluid">
        <div className="container d-flex align-items-center justify-content-between mb-3">
          <p className="m-0 fw-bold">Kuisioner</p>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#kuisioner"
            >
              <Io.IoMdAdd /> Tambah
            </button>
            <button
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#hapus"
            >
              <Fa6.FaRegTrashCan /> Hapus
            </button>
          </div>
        </div>

        <TableContainer
          page={page}
          totalPages={totalPages}
          setPage={(e) => setPage(e)}
          setLimit={(e) => setLimit(e)}
          onValue={(e) => setSearch(e)}
        >
          <table className="table table-striped table-hover mt-2">
            <thead>
              <tr>
                <th scope="col" style={{ width: 50 }}>
                  #
                </th>
                <th scope="col" style={{ width: 110 }}>
                  Jenis
                </th>
                <th scope="col" style={{ width: 600 }}>
                  Soal
                </th>
                <th scope="col">Pengisi</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.jenis}</td>
                  <td style={{ textAlign: "start" }}>{item.soal}</td>
                  <td>{item.pengisi}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button className="btn btn-warning">Edit</button>
                      <button className="btn btn-danger">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </div>

      {/* Modal */}
      <ModalComponent id={"kuisioner"} title={"Tambah kuisioner"}>
        <div className="modal-body d-flex flex-column gap-2">
          <select className="form-select" aria-label="Default select example">
            <option selected>Jenis</option>
            <option value="1">Kuisioner</option>
            <option value="2">Angket</option>
          </select>

          <select className="form-select" aria-label="Default select example">
            <option selected>Pengisi</option>
            <option value="1">Orang Tua</option>
            <option value="2">Calon Santriwati</option>
          </select>

          <Editor
            placeholder="Ketikan Pertanyaan Disini.."
            value={value}
            onChange={(html) => setValue(html)}
          />
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
      </ModalComponent>

      <ModalComponent id={"hapus"} title={"Hapus seluruh data kuisioner"}>
        <div className="modal-body">
          Apakah anda yakin ingin menghapus seluruh data kuisioner?
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Batalkan
          </button>
          <button type="button" className="btn btn-danger">
            Hapus
          </button>
        </div>
      </ModalComponent>
    </Layout>
  );
};

export default Kuis;
