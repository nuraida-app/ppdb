import React, { useEffect, useState } from "react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";
import Layout from "../../components/Layout";
import TableContainer from "../../components/TableContainer";
import ModalComponent from "../../components/ModalComponent";
import Editor from "./Editor";
import {
  useAddQuizMutation,
  useDeleteQuizMutation,
  useGetQuizQuery,
  useGetQuizzesQuery,
} from "../../api/services/ApiKuis";
import { toast } from "react-toastify";

const createMarkup = (html) => {
  return { __html: html };
};

const Kuis = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const [type, setType] = useState("default");
  const [input, setInput] = useState("default");
  const [id, setId] = useState(null);
  const [value, setValue] = useState("");

  const { data = {} } = useGetQuizzesQuery({ page, limit, search });
  const { questions = [], totalPages } = data;

  const [addQuiz, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddQuizMutation();
  const [
    deleteQuiz,
    {
      data: delMsg,
      isSuccess: delSuccess,
      isLoading: delLoading,
      error: delError,
      reset: delReset,
    },
  ] = useDeleteQuizMutation();
  const { data: detail } = useGetQuizQuery(id);

  const quizHandler = (e) => {
    e.preventDefault();

    const data = { id, type, question: value, input };

    if (type === "default" || input === "default" || value === "") {
      toast.error("Semua field harus diisi");
    }

    addQuiz(data);
  };

  const delHandler = (id) => deleteQuiz(id);

  useEffect(() => {
    if (isSuccess) {
      reset();
      setType("default");
      setInput("default");
      setValue("");
      setId(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (delSuccess) {
      toast.success(delMsg.message);
      delReset();
    }

    if (delError) {
      toast.error(delError.data.message);
      delReset();
    }
  }, [delMsg, delSuccess, delError, delReset]);

  useEffect(() => {
    if (detail) {
      setType(detail.jenis);
      setInput(detail.pengisi);
      setValue(detail.soal);
      setId(detail.id);
    }
  }, [detail]);

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
                <th scope="col">#</th>
                <th scope="col">Jenis</th>
                <th scope="col">Soal</th>
                <th scope="col">Pengisi</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {questions.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{(page - 1) * limit + index + 1}</th>
                  <td>{item.jenis}</td>
                  <td style={{ textAlign: "start" }}>
                    <div dangerouslySetInnerHTML={createMarkup(item.soal)} />
                  </td>
                  <td>{item.pengisi}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#kuisioner"
                        onClick={() => setId(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => delHandler(item.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </div>

      {/* Modal */}
      <ModalComponent
        id={"kuisioner"}
        title={"Tambah kuisioner"}
        data={msg}
        isSuccess={isSuccess}
        error={error}
        reset={reset}
      >
        <div className="modal-body d-flex flex-column gap-2 bg-light">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select shadow"
            aria-label="Default select example"
          >
            <option value="default">Jenis</option>
            <option value="Kuisioner">Kuisioner</option>
            <option value="Angket">Angket</option>
          </select>

          <select
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="form-select shadow"
            aria-label="Default select example"
          >
            <option value="default">Pengisi</option>
            <option value="Ortu">Orang Tua</option>
            <option value="Calon Peserta Didik">Calon Peserta Didik</option>
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
          <button
            type="button"
            className="btn btn-primary"
            onClick={quizHandler}
          >
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
