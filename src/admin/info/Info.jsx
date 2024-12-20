import React, { useEffect, useState } from "react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";
import Layout from "../../components/Layout";
import ModalComponent from "../../components/ModalComponent";
import Spinner from "../../components/Spinner";
import Editor from "./Editor";
import {
  useAddInfoMutation,
  useDeleteInfoMutation,
  useGetInfosQuery,
} from "../../api/services/ApiInfo";
import InputComponent from "../../components/InputComponent";
import { toast } from "react-toastify";
import Pagination from "../../components/Pagination";

const createMarkup = (html) => {
  return { __html: html };
};

const Info = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearchTerm] = useState("");

  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);
  const [category, setCategory] = useState("default");

  const { data = {} } = useGetInfosQuery({ page, limit, search });
  const { infos = [], results = [], totalPages = 1 } = data;
  const [addInfo, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddInfoMutation();
  const [
    deleteInfo,
    {
      data: dMsg,
      isSuccess: dSuccess,
      isLoading: dLoading,
      error: dError,
      reset: dReset,
    },
  ] = useDeleteInfoMutation();

  const addHandler = () => {
    const form = { id, title, category, value };

    if (!title || !category || !value) {
      toast.error("Form harus diisi");
      return;
    }

    addInfo(form);
  };

  const deleteHandler = (id) => {
    deleteInfo(id);
  };

  const handleRowsPerPageChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setValue("");
      setCategory("default");
    }

    if (dSuccess) {
      toast.success(dMsg.message);
      dReset();
    }

    if (dError) {
      toast.error(dError.data.message);
      dReset();
    }
  }, [dMsg, dSuccess, dError, isSuccess]);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="container d-flex align-items-center justify-content-between mb-3">
          <p className="m-0 fw-bold">Pusat Informasi</p>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#informasi"
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

        <div className="d-flex align-items-center justify-content-between mb-2">
          <InputComponent onValueChange={(value) => setSearchTerm(value)} />

          <div className="d-flex">
            <select
              className="form-select form-select-sm"
              value={limit}
              onChange={handleRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <div className="table-responsive rounded border mb-2">
          <table className="table table-striped table-hover my-2">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Kategori</th>
                <th scope="col">Judul</th>
                <th scope="col">Informasi</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {(results.length > 0 ? results : infos)?.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.kategori}</td>
                  <td>{item.judul}</td>

                  <td>
                    <p
                      className="text-start"
                      dangerouslySetInnerHTML={createMarkup(
                        `${item.teks.slice(0, 200)} ...`
                      )}
                    />
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button className="btn btn-warning">Edit</button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteHandler(item.id)}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={(e) => setPage(e)}
        />
      </div>

      {/* Modal */}
      <ModalComponent
        id={"informasi"}
        title={"Tambah Informasi"}
        data={msg}
        isSuccess={isSuccess}
        error={error}
        reset={reset}
      >
        <div className="modal-body d-flex flex-column gap-2">
          <select
            className="form-select"
            aria-label="Default select example"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="default">Pilih Kategori Informasi</option>
            <option value="Pembayaran">Pembayaran</option>
            <option value="Pengumuman">Pengumuman</option>
          </select>

          <input
            type="text"
            name="title"
            placeholder="Berikan Judul.."
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Editor
            placeholder="Tulis Informasi"
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
            disabled={isLoading ? true : false}
            onClick={addHandler}
          >
            {isLoading ? <Spinner /> : "Simpan"}
          </button>
        </div>
      </ModalComponent>

      <ModalComponent id={"hapus"} title={"Hapus seluruh data informasi"}>
        <div className="modal-body">
          Apakah anda yakin ingin menghapus seluruh data informasi?
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

export default Info;
