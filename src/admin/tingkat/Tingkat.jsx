import React, { useEffect, useState } from "react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";
import Layout from "../../components/Layout";
import ModalComponent from "../../components/ModalComponent";
import Search from "../../components/Search";
import {
  useAddLevelMutation,
  useDelLevelMutation,
  useGetLevelQuery,
  useGetLevelsMutation,
} from "../../api/services/ApiJenjang";
import { toast } from "react-toastify";
import TableContainer from "../../components/TableContainer";

const Tingkat = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const [getLevels, { data = {} }] = useGetLevelsMutation();
  const { levels = [], totalPages = 1 } = data;

  const { data: level } = useGetLevelQuery(id, { skip: !id });
  const [addLevel, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddLevelMutation();
  const [
    delLevel,
    {
      data: dMsg,
      isSuccess: dSuccess,
      isLoading: dLoading,
      error: dError,
      reset: dReset,
    },
  ] = useDelLevelMutation();

  const addHandler = () => {
    const form = { id, name };

    addLevel(form);
  };

  const deleteHandler = (id) => {
    delLevel(id);
  };

  const closeHandler = () => {
    setId(null);
    setName("");
  };

  useEffect(() => {
    if (dSuccess) {
      toast.success(dMsg.message);
      dReset();
    }

    if (dError) {
      toast.error(dError.data.message);
      dReset();
    }
  }, [dSuccess, dMsg, dError]);

  useEffect(() => {
    if (level) {
      setName(level.nama);
      setId(level.id);
    }
  }, [level]);

  useEffect(() => {
    if (isSuccess || dSuccess) {
      getLevels({ page, limit });
    }
  }, [isSuccess, dSuccess]);

  useEffect(() => {
    getLevels({ page, limit, search });
  }, [page, limit, search]);

  return (
    <Layout title={"Admin - Jenjang"}>
      <div className="container-fluid">
        <div className="container d-flex align-items-center justify-content-between mb-3">
          <p className="m-0 fw-bold">Jenjang Pendidikan</p>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#tingkat"
            >
              <Io.IoMdAdd /> Tambah
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
                <th scope="col">Nama</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ textAlign: "start" }}>{item.nama}</td>
                  <td className="d-flex align-items-center justify-content-center gap-2">
                    <button
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#tingkat"
                      onClick={() => setId(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteHandler(item.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </div>

      {/* Modal */}
      <ModalComponent
        id={"tingkat"}
        title={"Tambah Jenjang"}
        data={msg}
        isSuccess={isSuccess}
        error={error}
        reset={reset}
      >
        <div className="modal-body">
          <input
            type="text"
            className="form-control"
            id="namaTingkat"
            placeholder="Contoh: SMP / SMA"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={closeHandler}
          >
            Tutup
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addHandler()}
          >
            Simpan
          </button>
        </div>
      </ModalComponent>
    </Layout>
  );
};

export default Tingkat;
