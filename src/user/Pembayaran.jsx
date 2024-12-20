import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import * as Fa from "react-icons/fa";
import html2pdf from "html2pdf.js";
import ModalComponent from "../components/ModalComponent";
import {
  useMyPaymentQuery,
  useUploadPaymentMutation,
} from "../api/services/ApiPembayaran";
import { useSelector } from "react-redux";

const formatCurrency = (value) => {
  const number = value.replace(/[^\d]/g, "");
  return `Rp ${parseInt(number, 10).toLocaleString("id-ID")}`;
};

const parseCurrency = (value) => {
  return value.replace(/[^\d]/g, ""); // remove 'Rp' and any non-numeric characters
};

const formatTanggal = (tgl) => {
  if (!tgl) return "-";
  const date = new Date(tgl);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const UserPembayaran = () => {
  // Data Pembayaran
  const { user } = useSelector((state) => state.user);
  const { data } = useMyPaymentQuery(user.id, { skip: !user.id });

  // form
  const [uploadPayment, { data: message, isLoading, isSuccess, error, reset }] =
    useUploadPaymentMutation();

  const [formData, setFormData] = useState({
    file: null,
    nominal: 0,
    nama: "",
    media: "default",
  });

  const inputHandler = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else if (name === "nominal") {
      setFormData({ ...formData, nominal: formatCurrency(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = () => {
    if (
      !formData.file ||
      formData.nominal === 0 ||
      !formData.nama ||
      !formData.media === "defaul"
    ) {
      alert("Pantikan semua form diisi");
      return;
    }

    const form = new FormData();
    form.append("file", formData.file);
    form.append("nominal", parseCurrency(formData.nominal));
    form.append("nama", formData.nama);
    form.append("media", formData.media);

    uploadPayment(form);
  };

  // Cetak invoice
  const invoiceRef = useRef();

  const handleDownload = () => {
    const element = invoiceRef.current;
    const options = {
      margin: 10,
      filename: `${user?.nama}-invoice.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "b5", orientation: "landscape" },
    };

    html2pdf().set(options).from(element).save();
  };

  return (
    <Layout>
      {/* Header dengan responsivitas */}
      <div className="container border-bottom py-2 mb-3">
        <div className="row align-items-center">
          <div className="col-12 col-md-6 mb-2 mb-md-0">
            <h4 className="m-0">Pembayaran</h4>
            <p>
              Status:{" "}
              <strong
                className={`${
                  !data?.ket ? `text-danger` : `text-success`
                } ms-2`}
              >
                {!data
                  ? `Belum ada transaksi`
                  : !data?.ket
                  ? `Diproses`
                  : `Terkonfirmasi`}
              </strong>
            </p>
          </div>
          <div className="col-12 col-md-6 d-flex gap-2 justify-content-md-end flex-column flex-md-row">
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#modal"
              disabled={!data ? false : true}
            >
              <Fa.FaCloudUploadAlt size={20} /> Pembayaran
            </button>
            <button
              className="btn btn-success"
              onClick={handleDownload}
              disabled={!data ? true : !data?.ket ? true : false}
            >
              <Fa.FaCloudDownloadAlt size={20} /> Download
            </button>
          </div>
        </div>
      </div>

      <div className="container mb-3">
        Pembayaran untuk pendafataran dapat ditransfer ke Transfer ke No. Rek.
        Bank Muamalat 1210077935 a.n Yayasan Izzatul Muhsinin sebesar Rp
        1.100.000
      </div>

      {/* Kartu Invoice */}
      {data?.ket && (
        <div ref={invoiceRef} className="card" style={{ maxWidth: 500 }}>
          <div className="card-body">
            <h5 className="card-title">Invoice</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              Pembayaran PPDB Nuraida Islamic Boarding School
            </h6>
            <p className="card-subtitle mb-2 text-muted fst-italic">
              Nomor Pembayaran
            </p>
            <div className="card-text">
              <table className="table">
                <tbody>
                  <tr>
                    <td className="text-start">Nama</td>
                    <td>:</td>
                    <td className="text-start">{data?.nama}</td>
                  </tr>
                  <tr>
                    <td className="text-start">Pembayaran</td>
                    <td>:</td>
                    <td className="text-start">PPDB</td>
                  </tr>
                  <tr>
                    <td className="text-start">Nominal</td>
                    <td>:</td>
                    <td className="text-start">
                      {`Rp ${parseFloat(data?.nominal).toLocaleString("id")}`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-column justify-content-end align-items-end">
              <p className="m-0">{`Bogor, ${formatTanggal(
                data?.tgl_bayar
              )}`}</p>
              <img src="/logo.png" alt="logo" height="40" width="40" />
              <p className="m-0">Petugas PPDB</p>
            </div>
          </div>
        </div>
      )}

      <ModalComponent
        id={"modal"}
        title={"Upload Berkas Pembayaran"}
        isSuccess={isSuccess}
        data={message}
        error={error}
        reset={reset}
      >
        <div className="modal-body d-flex flex-column gap-2">
          <input
            type="file"
            name="file"
            id="file"
            className="form-control"
            onChange={inputHandler}
            required
          />

          <input
            type="text"
            name="nominal"
            id="nama"
            placeholder="Nominal yang dibayarkan"
            className="form-control"
            onChange={inputHandler}
            value={formData.nominal}
            required
          />

          <input
            type="text"
            name="nama"
            id="nama"
            placeholder="Nama calon siswa"
            className="form-control"
            onChange={inputHandler}
            required
          />

          <select
            className="form-select"
            aria-label="Default select example"
            name="media"
            onChange={inputHandler}
            required
          >
            <option value="defaultt">Dapat dari mana informasi nuraida?</option>
            <option value="Intagram">Instagram</option>
            <option value="YouTube">YouTube</option>
            <option value="Pameran">Pameran</option>
            <option value="Website">Website</option>
            <option value="Kerabat">Kerabat</option>
          </select>
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
            onClick={submitHandler}
          >
            {isLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
              </div>
            ) : (
              "Simpan"
            )}
          </button>
        </div>
      </ModalComponent>
    </Layout>
  );
};

export default UserPembayaran;
