import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TableContainer from "../../components/TableContainer";
import { toast } from "react-toastify";
import {
  useConfirmPaymentMutation,
  useGetPaymentsQuery,
} from "../../api/services/ApiPembayaran";

const columns = [
  { label: "No" },
  { label: "Nama" },
  { label: "Nominal" },
  { label: "Berkas" },
  { label: "Aksi" },
];

const Pembayaran = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");

  const { data } = useGetPaymentsQuery({ page, limit, search });
  const [confirmPayment, { data: msg, isSuccess, isLoading, error, reset }] =
    useConfirmPaymentMutation();

  const goToLink = (link) => {
    window.open(link, "_blank");
  };

  const update = (id) => confirmPayment(id);

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
      <div className="container d-flex align-items-center justify-content-between mb-3">
        <p className="m-0 fw-bold">Pembayaran</p>
      </div>

      <TableContainer
        page={page}
        totalPages={data?.totalPages}
        setPage={(e) => setPage(e)}
        setLimit={(e) => setLimit(e)}
        onValue={(e) => setSearch(e)}
      >
        <table className="table table-striped table-hover mt-2">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} scope="col" className="text-center">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.payments.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{(page - 1) * limit + index + 1}</th>
                <td>{item.nama}</td>
                <td>{`Rp ${parseFloat(item.nominal).toLocaleString(
                  "id-ID"
                )}`}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() => goToLink(item.berkas)}
                    >
                      Berkas
                    </button>
                  </div>
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-success me-2"
                      disabled={item.ket ? true : false}
                      onClick={() => update(item.user_id)}
                    >
                      Konfirmasi
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </Layout>
  );
};

export default Pembayaran;
