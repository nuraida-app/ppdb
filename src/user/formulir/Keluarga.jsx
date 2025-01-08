import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useSelector } from "react-redux";
import { useMyPaymentQuery } from "../../api/services/ApiPembayaran";
import NotAllowed from "../NotAllowed";
import TableContainer from "../../components/TableContainer";
import {
  useAddFamilyMutation,
  useDeleteFamilyMutation,
  useGetFamilyFormQuery,
} from "../../api/services/ApiFrom";
import ModalComponent from "../../components/ModalComponent";
import { toast } from "react-toastify";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid dates
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const calculateAge = (birthDate) => {
  const today = new Date();
  const birth = new Date(birthDate);
  if (isNaN(birth.getTime())) return "-"; // Handle invalid date
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const Keluarga = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const { user } = useSelector((state) => state.user);
  const { data } = useMyPaymentQuery(user?.id, { skip: !user?.id });
  const [addFamily, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddFamilyMutation();
  const { data: rawData = {} } = useGetFamilyFormQuery(
    { page, limit, search, id: user?.id },
    {
      skip: !user?.id,
    }
  );
  const { families = [], totalPages } = rawData;
  const [
    deleteFamily,
    {
      data: delMsg,
      isSuccess: delSuccess,
      isLoading: delLoading,
      error: delError,
      reset: delReset,
    },
  ] = useDeleteFamilyMutation();

  const addhandler = () => {
    if (!name || !birthDate) {
      return toast.error("Data harus diisi");
    }

    const data = { nama: name, tgl: birthDate };

    addFamily(data);
  };

  const deletehandler = (id) => deleteFamily(id);

  useEffect(() => {
    if (delSuccess) {
      toast.success(delMsg.message);
      reset();
    }

    if (delError) {
      toast.error(delError.data.message);
      reset();
    }
  }, [delMsg, delSuccess, delError]);

  return (
    <Layout>
      {data?.ket ? (
        <div className="container-fluid">
          <div className="col-12 col-lg-auto py-2 mb-lg-2 me-lg-3 d-flex align-items-center justify-content-between border-bottom">
            <h5 className="py-2 m-0">Data Keluarga</h5>
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#keluarga"
            >
              Tambah
            </button>
          </div>

          <TableContainer
            page={page}
            setPage={(e) => setPage(e)}
            setLimit={(e) => setLimit(e)}
            onValue={(e) => setSearch(e)}
            totalPages={totalPages}
          >
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Nama</th>
                  <th scope="col">Tanggal Lahir</th>
                  <th scope="col">Usia</th>
                  <th scope="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {families?.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <td className="text-start">{user.nama}</td>
                    <td>{formatDate(user.tanggal_lahir)}</td>
                    <td>{`${calculateAge(user.tanggal_lahir)} Thn`}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deletehandler(user.id)}
                      >
                        hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </div>
      ) : (
        <NotAllowed />
      )}

      <ModalComponent
        id={"keluarga"}
        isSuccess={isSuccess}
        title={"Tambah Anggota Keluarga"}
        data={msg}
        error={error}
        reset={reset}
      >
        <div className="modal-body d-flex flex-column gap-2">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
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
            onClick={addhandler}
          >
            Simpan
          </button>
        </div>
      </ModalComponent>
    </Layout>
  );
};

export default Keluarga;
