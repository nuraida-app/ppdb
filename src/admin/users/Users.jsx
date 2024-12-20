import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useGetUsersMutation } from "../../api/services/ApiUsers";
import * as Md from "react-icons/md";
import TableContainer from "../../components/TableContainer";
import Spinner from "../../components/Spinner";

const Users = () => {
  const [getUsers, { data = {}, isLoading }] = useGetUsersMutation();
  const { users = [], totalPages = 1 } = data;

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers({ page, limit, search });
  }, [page, limit, search]);

  return (
    <Layout title={"Daftar Pengguna"}>
      <div className="container-fluid">
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
                <th scope="col">Email</th>
                <th scope="col">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{(page - 1) * limit + index + 1}</th>
                  <td style={{ textAlign: "start" }}>{user.nama}</td>
                  <td style={{ textAlign: "start" }}>{user.email}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        window.open(`https://wa.me/${user.tlp}`, "_blank")
                      }
                    >
                      <Md.MdWhatsapp /> {user.tlp}
                    </button>
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

export default Users;
