import React, { useState } from "react";
import Layout from "../../components/Layout";
import TableContainer from "../../components/TableContainer";
import { useGetFormsQuery } from "../../api/services/ApiFrom";
import { useNavigate } from "react-router-dom";

const columns = [
  { label: "No" },
  { label: "Kode" },
  { label: "Kode User" },
  { label: "Nama" },
  { label: "Whatsapp" },
  { label: "Aksi" },
];

const Tolak = () => {
  const navigate = useNavigate();

  const status = "Ditolak";
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data = {} } = useGetFormsQuery({ status, page, limit, search });
  const { users = [], totalPages } = data;

  const goToLink = (id) => navigate(`/admin-pendaftar/${id}`);

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
                            `https://wa.me/${user.tlp_ayah}`,
                            "_blank"
                          )
                        }
                      >
                        {`Ayah: ${user.tlp_ayah}`}
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={() =>
                          window.open(`https://wa.me/${user.tlp_ibu}`, "_blank")
                        }
                      >
                        {`Ibu: ${user.tlp_ibu}`}
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center justify-content-center gap-2">
                      <button className="btn btn-primary">Terima</button>
                      <button className="btn btn-danger">Tolak</button>
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

export default Tolak;
