import React, { useEffect, useState } from "react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";
import * as Md from "react-icons/md";
import Layout from "../../components/Layout";
import ModalComponent from "../../components/ModalComponent";
import Search from "../../components/Search";
import {
  useAddSchoolMutation,
  useClearDataMutation,
  useDelSchoolMutation,
  useGetSchoolQuery,
  useGetSchoolsMutation,
} from "../../api/services/ApiSekolah";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import TableContainer from "../../components/TableContainer";

const Sekolah = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [search, setSearch] = useState();

  const [getSchools, { data, isLoading: getLoading }] = useGetSchoolsMutation();

  const { data: school } = useGetSchoolQuery(id, { skip: !id });
  const [addSchool, { data: msg, isSuccess, error, isLoading, reset }] =
    useAddSchoolMutation();
  const [
    delSchool,
    {
      data: dMsg,
      isSuccess: dSuccess,
      error: dError,
      isLoading: dLoading,
      reset: dReset,
    },
  ] = useDelSchoolMutation();
  const [
    clearData,
    {
      data: cData,
      isSuccess: cSuccess,
      isLoading: cLoading,
      error: cError,
      reset: cReset,
    },
  ] = useClearDataMutation();

  const addHandler = () => {
    const form = { id: id ? id : null, name };

    addSchool(form);
  };

  const deleteHandler = (id) => {
    delSchool(id);
  };

  const closeHandler = () => {
    setName("");
    setId(null);
  };

  useEffect(() => {
    if (isSuccess || cSuccess || dSuccess) {
      getSchools({ page, limit });
    }
  }, [isSuccess, cSuccess, dSuccess]);

  useEffect(() => {
    getSchools({ page, limit, search });
  }, [page, limit, search]);

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
    if (school) {
      setName(school.nama);
      setId(school.id);
    }
  }, [school]);

  const totalPages = data?.totalPages;

  return (
    <Layout title={"Admin - Daftar Sekolah"}>
      <div className="container-fluid">
        <div className="container d-flex align-items-center justify-content-between mb-3">
          <p className="m-0 fw-bold">Sekolah</p>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#sekolah"
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
                <th scope="col">Nama Sekolah</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data?.schools?.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ textAlign: "start" }}>{item.nama}</td>
                  <td className="d-flex align-items-center justify-content-center gap-2">
                    <button
                      className="btn btn-warning"
                      data-bs-toggle="modal"
                      data-bs-target="#sekolah"
                      onClick={() => setId(item.id)}
                    >
                      Edit
                    </button>{" "}
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
        id={"sekolah"}
        title={"Tambah Sekolah"}
        data={msg}
        isSuccess={isSuccess}
        error={error}
        reset={reset}
      >
        <div className="modal-body">
          <input
            type="text"
            className="form-control"
            id="namaSekolah"
            placeholder="Masukan Nama Sekolah"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            required
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
            onClick={addHandler}
            disabled={isLoading ? true : false}
          >
            {isLoading ? <Spinner /> : "Simpan"}
          </button>
        </div>
      </ModalComponent>

      <ModalComponent
        id={"hapus"}
        title={" Hapus seluruh data sekolah"}
        data={cData}
        isSuccess={cSuccess}
        error={cError}
        reset={cReset}
      >
        <div className="modal-body">
          Apakah anda yakin ingin menghapus seluruh data sekolah?
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Batalkan
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={clearData}
            disabled={cLoading ? true : false}
          >
            {cLoading ? <Spinner /> : "Hapus"}
          </button>
        </div>
      </ModalComponent>
    </Layout>
  );
};

export default Sekolah;
