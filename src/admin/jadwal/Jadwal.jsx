import React, { useEffect, useState } from "react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";
import Layout from "../../components/Layout";
import {
  useAddScheduleMutation,
  useDeleteScheduleMutation,
  useGetScheduleQuery,
  useGetSchedulesQuery,
} from "../../api/services/ApiJadwal";
import TableContainer from "../../components/TableContainer";
import ModalComponent from "../../components/ModalComponent";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const Jadwal = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const [id, setId] = useState(null);
  const [time, setTime] = useState("");
  const [type, setType] = useState("default");
  const [name, setName] = useState("");
  const [mode, setMode] = useState("default");
  const [quota, setQuota] = useState("");

  const { data = {} } = useGetSchedulesQuery({ page, limit, search });
  const { schedules = [], totalPages = null } = data;
  const { data: schedule } = useGetScheduleQuery(id, { skip: !id });
  const [addSchedule, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddScheduleMutation();
  const [
    deleteSchedule,
    {
      data: dMsg,
      isSuccess: dSuccess,
      isLoading: dLoading,
      error: dError,
      reset: dReset,
    },
  ] = useDeleteScheduleMutation();

  const addHandler = () => {
    const form = { id, name, time, type, quota, mode };

    addSchedule(form);
  };

  const deletehandler = (id) => {
    deleteSchedule(id);
  };

  const closeHandler = () => {
    setId(null);
    setName("");
    setTime("");
    setType("default");
    setQuota("");
    setMode("default");
  };

  useEffect(() => {
    if (isSuccess) {
      setId(null);
      setTime("");
      setType("default");
      setName("");
      setMode("default");
      setQuota("");
    }

    if (dSuccess) {
      toast.success(dMsg.message);
      dReset();
    }

    if (dError) {
      toast.error(dError.data.message);
      dReset();
    }
  }, [isSuccess, dSuccess, dError]);

  useEffect(() => {
    if (schedule) {
      setId(schedule.id);
      setName(schedule.kegiatan);
      setTime(new Date(schedule.waktu).toISOString().slice(0, 10));
      setType(schedule.jenis);
      setQuota(schedule.kuota);
      setMode(schedule.mode);
    }
  }, [schedule]);

  return (
    <Layout title={"Penjadwalan"}>
      <div className="container-fluid">
        <div className="container d-flex align-items-center justify-content-between mb-3">
          <p className="m-0 fw-bold">Penjadwalan Waktu Tes</p>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#jadwal"
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
                <th style={{ width: 50 }} scope="col">
                  #
                </th>
                <th scope="col">Kegiatan</th>
                <th scope="col">Jenis</th>
                <th scope="col">Kuota</th>
                <th scope="col">Jadwal</th>
                <th scope="col">Peserta</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ textAlign: "start" }}>{item.kegiatan}</td>
                  <td>{item.jenis}</td>
                  <td>{item.kuota}</td>
                  <td>{new Date(item.waktu).toDateString("id-ID")}</td>
                  <td>{item.peserta}</td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button
                        className="btn btn-warning"
                        data-bs-toggle="modal"
                        data-bs-target="#jadwal"
                        onClick={() => setId(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        disabled={dLoading ? true : false}
                        onClick={() => deletehandler(item.id)}
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
        id={"jadwal"}
        title={"Tambah Jadwal Tes"}
        data={msg}
        isSuccess={isSuccess}
        error={error}
        reset={reset}
      >
        <div className="modal-body d-flex flex-column gap-3">
          <input
            className="form-control"
            type="date"
            name="date"
            id="date"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <select
            className="form-select"
            aria-label="Default select example"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="default">Pilih Kegiatan</option>
            <option value="tes">Tes Tulis</option>
            <option value="mcu">MCU</option>
          </select>

          <select
            className="form-select"
            aria-label="Default select example"
            required
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="default">Pilih Moda</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          <input
            type="text"
            className="form-control"
            placeholder="Nama Kegiatan"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="number"
            className="form-control"
            placeholder="kuota"
            required
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
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
          >
            {isLoading ? <Spinner /> : "Simpan"}
          </button>
        </div>
      </ModalComponent>

      <ModalComponent id={"hapus"} title={"Hapus seluruh data penjadwalan"}>
        <div className="modal-body">
          Apakah anda yakin ingin menghapus seluruh data penjadwalan?
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

export default Jadwal;
