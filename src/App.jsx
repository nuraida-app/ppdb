import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

import Homepage from "./home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Reset from "./components/Reset";
import Loader from "./components/Loader";
import { useDispatch } from "react-redux";
import { useLoadMutation } from "./api/services/ApiAuthorize";
import { setLogin } from "./api/features/Authorize";

// Admin
const Dashboard = lazy(() => import("./admin/dashboard/Dashboard"));
const Users = lazy(() => import("./admin/users/Users"));
const Tapel = lazy(() => import("./admin/tapel/Tapel"));
const Tingkat = lazy(() => import("./admin/tingkat/Tingkat"));
const Sekolah = lazy(() => import("./admin/sekolah/Sekolah"));
const Info = lazy(() => import("./admin/info/Info"));
const Jadwal = lazy(() => import("./admin/jadwal/Jadwal"));
const Kuis = lazy(() => import("./admin/kuis/Kuis"));
const Process = lazy(() => import("./admin/calon/Proses"));
const Terima = lazy(() => import("./admin/calon/Terima"));
const Tolak = lazy(() => import("./admin/calon/Tolak"));
const Pembayaran = lazy(() => import("./admin/bayar/Pembayaran"));

//User
const UserDashboard = lazy(() => import("./user/UserDashboard"));
const UserPembayaran = lazy(() => import("./user/Pembayaran"));
const Biodata = lazy(() => import("./user/formulir/Biodata"));
const Ortu = lazy(() => import("./user/formulir/Ortu"));
const Keluarga = lazy(() => import("./user/formulir/Keluarga"));
const Alamat = lazy(() => import("./user/formulir/Alamat"));
const Fsekolah = lazy(() => import("./user/formulir/Fsekolah"));
const Kesehatan = lazy(() => import("./user/formulir/Kesehatan"));
const Berkas = lazy(() => import("./user/formulir/Berkas"));
const Kuisioner = lazy(() => import("./user/formulir/Kuisioner"));

function App() {
  const dispatch = useDispatch();
  const [load] = useLoadMutation();

  useEffect(() => {
    load()
      .unwrap()
      .then((user) => {
        dispatch(setLogin(user));
      });
  }, [dispatch, load]);
  return (
    <BrowserRouter>
      <ToastContainer autoClose={2000} />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Route Admin */}
          <Route exact path="/" element={<Homepage />} />

          <Route exact path="/masuk" element={<SignIn />} />

          <Route exact path="/daftar" element={<SignUp />} />

          <Route exact path="/reset" element={<Reset />} />

          <Route exact path="/admin/beranda" element={<Dashboard />} />

          <Route exact path="/admin/users" element={<Users />} />

          <Route exact path="/admin/tapel" element={<Tapel />} />

          <Route exact path="/admin/tingkat" element={<Tingkat />} />

          <Route exact path="/admin/sekolah" element={<Sekolah />} />

          <Route exact path="/admin/info" element={<Info />} />

          <Route exact path="/admin/jadwal" element={<Jadwal />} />

          <Route exact path="/admin/kuisioner" element={<Kuis />} />

          <Route exact path="/admin/pendaftar" element={<Process />} />

          <Route exact path="/admin/diterima" element={<Terima />} />

          <Route exact path="/admin/ditolak" element={<Tolak />} />

          <Route exact path="/admin/pembayaran" element={<Pembayaran />} />

          {/* Route User */}
          <Route exact path="/user/beranda" element={<UserDashboard />} />

          <Route exact path="/user/pembayaran" element={<UserPembayaran />} />

          <Route exact path="/user/data-diri" element={<Biodata />} />

          <Route exact path="/user/orang-tua" element={<Ortu />} />

          <Route exact path="/user/keluarga" element={<Keluarga />} />

          <Route exact path="/user/alamat" element={<Alamat />} />

          <Route exact path="/user/sekolah" element={<Fsekolah />} />

          <Route exact path="/user/kesehatan" element={<Kesehatan />} />

          <Route exact path="/user/berkas" element={<Berkas />} />

          <Route exact path="/user/kuisioner" element={<Kuisioner />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
