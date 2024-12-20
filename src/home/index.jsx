import React, { Fragment, useState } from "react";
import "./home.css";
import Map from "./map";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert("Harap isi Nama Lengkap dan Pesan.");
      return;
    }
    const phoneNumber = 6281311141632;
    const encodedMessage = encodeURIComponent(
      `Nama: ${name}\n\nPesan:\n${message}`
    );
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Buka di tab baru
    window.open(whatsappURL, "_blank");
  };
  return (
    <Fragment>
      {/* Header */}
      <div className="container-fluid shadow-sm">
        <header className="container d-flex flex-wrap align-items-center justify-content-between py-3 mb-4">
          <a
            href="/"
            className="d-flex gap-2 align-items-center col-md-6 col-sm-6 mb-md-0 text-dark text-decoration-none"
          >
            <img src="logo.png" alt="logo" height="40" />

            <p className="m-0">Nuraida PPDB</p>
          </a>

          <div className="col-md-6 col-sm-6 text-end">
            <button type="button" className="btn btn-primary">
              <Link to="/masuk" className="text-white text-decoration-none">
                Masuk
              </Link>
            </button>
          </div>
        </header>
      </div>

      {/* Hero */}
      <div
        className="container d-flex align-items-center justify-content-center text-center"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <div className="row flex-lg-row-reverse align-items-center w-100">
          <div className="d-flex justify-content-center col-lg-6 col-sm-12 position-relative">
            <img
              src="icon1.png"
              className="img-fluid my-5"
              alt="Bootstrap Themes"
              width="250"
              loading="lazy"
            />

            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>

          <div className="col-lg-6">
            <h1 className="fw-bold lh-1 mb-3">
              Nuraida Islamic Boarding School
            </h1>
            <p className="lead">
              Website PPDB (Penerimaan Peserta Didik Baru) adalah platform
              daring yang dirancang untuk mendukung proses pendaftaran siswa
              baru. Tujuannya adalah memberikan kemudahan dan transparansi bagi
              calon santri, orang tua, serta pihak sekolah dalam proses seleksi
              masuk NIBS.
            </p>
          </div>
        </div>
      </div>

      {/* Informasi */}

      <div className="container px-4 py-5" id="custom-cards">
        <h2 className="pb-2 border-bottom">Informasi Pendaftaran</h2>

        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col d-flex justify-content-center">
            <div className="card" style={{ width: "30rem" }}>
              <img src="/img-req.webp" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{`Dana Pengembangan Ma'had (DPM)`}</h5>
                <div className="card-text">
                  <ul>
                    <li>Sarana dan Prasarana Sekolah</li>
                    <li>Fasilitas Santriwati</li>
                    <li>Baju Seragam</li>
                    <li>Kasur Busa Santriwati</li>
                    <li>Biaya Kegiatan Tahun Ke-1</li>
                    <li>Buku Paket Tahun Ke-1</li>
                  </ul>
                  <p className="fw-bold">Rp 37.000.000</p>
                  <p>SPP/Bulan Rp 3.800.000</p>
                  <p className="fst-italic">*Tidak termasuk laundy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col d-flex justify-content-center">
            <div className="card" style={{ width: "30rem" }}>
              <img
                src="/img-2.jpg"
                className="card-img-top"
                alt="tumpukan kertas"
                loading="lazy"
              />
              <div className="card-body">
                <h5 className="card-title">Persyaratan</h5>
                <div className="card-text">
                  <ul>
                    <li>{`Scan KK (PDF max 4mb)`}</li>
                    <li>{`Scan KTP kedua orang tua (PDF max 4mb)`}</li>
                    <li>{`Scan Akta Lahir (PDX max 4mb)`}</li>
                    <li>{`Scan NISN (PDF max 4mb)`}</li>
                    <li>
                      {`Scan Rapor (PDF max 10mb)`}
                      <ul>
                        <li>{`Pendaftar SMP (Kelas 4 - Kelas 5)`}</li>
                        <li>{`Pendaftar SMA (kelas 4 - Kelas 8)`}</li>
                      </ul>
                    </li>
                    <li>{`Scan Ijazah (PDF max 4mb)`}</li>
                    <li>
                      {`Foto 3x4 (max 4mb)`}
                      <ul>
                        <li>{`SMP (Latar Merah Berseragam SD)`}</li>
                        <li>{`SMA (Latar Biru Berseragam SMP)`}</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="col d-flex justify-content-center">
            <div className="card" style={{ width: "30rem" }}>
              <img
                src="/img-3.jpg"
                className="card-img-top"
                alt="grafik"
                loading="lazy"
              />
              <div className="card-body">
                <h5 className="card-title">Alur Pendaftaran</h5>
                <div className="card-text">
                  <ul>
                    <li>Membuat akun</li>
                    <li>
                      Melakukan Pembayaran Sesuai dengan nominal pada menu
                      pembayaran
                    </li>
                    <li>Mengisi Formulir dengan lengkap</li>
                    <li>Upload berkas sesuai dengan form yang diminta</li>
                    <li>Ikuti Seleksi pendaftaran</li>
                    <li>Pengumunan kelulusan</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Lulusan */}
      <div className="container px-4 py-5 d-flex flex-column gap-3">
        <h2 className="pb-2 border-bottom">Lulusan Nuraida</h2>

        <div className="row m-0 d-flex align-items-center">
          <div className="col-lg-2">
            <p className="m-0">Universitas Indonesia</p>
          </div>
          <div className="col-lg-10">
            <div
              className="progress"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="100"
            >
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "100%" }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>

        <div className="row m-0 d-flex align-items-center">
          <div className="col-lg-2">
            <p className="m-0">Universitas Indonesia</p>
          </div>
          <div className="col-lg-10">
            <div
              className="progress"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="100"
            >
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "100%" }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>

        <div className="row m-0 d-flex align-items-center">
          <div className="col-lg-2">
            <p className="m-0">Universitas Indonesia</p>
          </div>
          <div className="col-lg-10">
            <div
              className="progress"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="100"
            >
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "100%" }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>

        <div className="row m-0 d-flex align-items-center">
          <div className="col-lg-2">
            <p className="m-0">Universitas Indonesia</p>
          </div>
          <div className="col-lg-10">
            <div
              className="progress"
              data-bs-toggle="tooltip"
              data-bs-placement="bottom"
              title="100"
            >
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: "100%" }}
                aria-valuenow="100"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Narahubung */}

      <div className="container px-4 py-5">
        <h2 className="pb-2 border-bottom">Narahubung</h2>

        <div className="row">
          <div className="col-lg-6 col-sm-12 d-flex align-items-center justify-content-center">
            <div className="d-flex gap-4 align-items-center">
              <form
                className="my-5"
                onSubmit={handleSubmit}
                style={{ width: 350 }}
              >
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nama Lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea"
                    rows="10"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <label htmlFor="floatingTextarea">Pesan</label>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6 col-sm-12">
            <Map />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col-md-4 col-sm-6 mb-0 text-body-secondary">
            © 2024 NIBS
          </p>

          <a
            href="/"
            className="col-md-4 col-sm-6 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
          >
            <img src="/logo.png" alt="" width="50" />
          </a>

          <ul className="nav col-md-4 col-sm-12 justify-content-end">
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                Masuk
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-body-secondary">
                Daftar
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </Fragment>
  );
};

export default Homepage;
