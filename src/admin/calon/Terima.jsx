import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import TableContainer from "../../components/TableContainer";
import {
  useChangeStatusMutation,
  useGetFormsQuery,
} from "../../api/services/ApiFrom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const columns = [
  { label: "No" },
  { label: "Kode" },
  { label: "Kode User" },
  { label: "Nama" },
  { label: "Whatsapp" },
  { label: "Aksi" },
];

const Terima = () => {
  const navigate = useNavigate();

  const status1 = "Diproses";
  const status2 = "Diterima";
  const status3 = "Ditolak";
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data = {} } = useGetFormsQuery({
    status: status2,
    page,
    limit,
    search,
  });
  const { users = [], totalPages } = data;
  const [changeStatus, { data: msg, isSuccess, isLoading, error, reset }] =
    useChangeStatusMutation();

  const goToLink = (id) => navigate(`/admin-pendaftar/${id}`);

  const change = (id, status) => {
    changeStatus({ id, status });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [msg, isSuccess, error]);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="container d-flex align-items-center justify-content-between mb-3">
          <p className="m-0 fw-bold">Pendaftar</p>
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
                {columns.map((column, i) => (
                  <th key={i} scope="col" className="text-center">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{(page - 1) * limit + index + 1}</th>
                  <td>{user.kode_pendaftaran}</td>
                  <td>{user.userid}</td>
                  <td className="text-start">{user.nama}</td>
                  <td>
                    <div className="d-flex flex-column gap-1 align-items-center justify-content-center">
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          window.open(
                            `https://wa.me/${user.ayah_no_tlp}`,
                            "_blank"
                          )
                        }
                      >
                        {`Ayah: ${user.ayah_no_tlp}`}
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          window.open(
                            `https://wa.me/${user.ibu_no_tlp}`,
                            "_blank"
                          )
                        }
                      >
                        {`Ibu: ${user.ibu_no_tlp}`}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => change(user.userid, status1)}
                      >
                        Proses
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => change(user.userid, status3)}
                      >
                        Tolak
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() => goToLink(user.userid)}
                      >
                        Detail
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </div>
    </Layout>
  );
};

export default Terima;
