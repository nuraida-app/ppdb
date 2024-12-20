import React, { useEffect, useState } from "react";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Io from "react-icons/io";
import Layout from "../../components/Layout";
import ModalComponent from "../../components/ModalComponent";
import {
  useAddYearMutation,
  useDeleteYearMutation,
  useGetYearQuery,
  useGetYearsQuery,
} from "../../api/services/ApiTapel";
import { toast } from "react-toastify";

const Tapel = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const { data } = useGetYearsQuery();
  const [addYear, { data: msg, isSuccess, error, reset }] =
    useAddYearMutation();
  const [
    deleteYear,
    { data: dMsg, isSuccess: dSuccess, error: dError, reset: dReset },
  ] = useDeleteYearMutation();
  const { data: year } = useGetYearQuery(id, { skip: !id });

  const addHandler = () => {
    const formData = { id: id ? id : null, name };

    addYear(formData);
  };

  const deleteHandler = (id) => {
    deleteYear(id);
  };

  const closeHandler = () => {
    setName("");
    setId("");
  };

  useEffect(() => {
    if (year) {
      setName(year.tapel);
      setId(year.id);
    }
  }, [year]);

  useEffect(() => {
    if (dSuccess) {
      toast.success(dMsg.message);
      dReset();
    }

    if (dError) {
      toast.error(dError.data.message);
      dReset();
    }
  }, [dMsg, dSuccess, dError]);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="container d-flex align-items-center justify-content-between mb-3">
          <p className="m-0 fw-bold">Tahun Pelajaran</p>

          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#tapel"
            >
              <Io.IoMdAdd /> Tambah
            </button>
          </div>
        </div>

        <table className="table table-striped table-hover mt-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tahun ajar</th>
              <th scope="col">Last</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td style={{ textAlign: "start" }}>{item.tapel}</td>
                <td className="d-flex justify-content-center gap-2">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#tapel"
                    className="btn btn-warning"
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
      </div>

      {/* Modal */}
      <ModalComponent
        id={"tapel"}
        title={" Tambah Tahun Pelajaran"}
        data={msg}
        isSuccess={isSuccess}
        error={error}
        reset={reset}
      >
        <div className="modal-body">
          <input
            type="text"
            className="form-control"
            id="namaTahunAjar"
            placeholder="Masukan Tahun ajar"
            value={name}
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
            onClick={addHandler}
          >
            Simpan
          </button>
        </div>
      </ModalComponent>
    </Layout>
  );
};

export default Tapel;
