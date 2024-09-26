import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Homepage from "./home/Homepage";
import Loader from "./components/loader/Loader";
import { useDispatch } from "react-redux";
import { useLoadMutation } from "./api/service/authApi";
import { setLogin } from "./api/features/authSlice";
import Login from "./admin/components/auth/Login";

// USER
const UserPage = lazy(() => import("./user/UserPage"));
const Formulir = lazy(() => import("./user/Formulir"));
const Payment = lazy(() => import("./user/Payment"));
const Profile = lazy(() => import("./user/Profile"));

// ADMIN
const AdminPage = lazy(() => import("./admin/dashboard/AdminPage"));
const Homebase = lazy(() => import("./admin/main_data/Hombase"));
const AcademicYear = lazy(() => import("./admin/main_data/AcademicYear"));
const School = lazy(() => import("./admin/main_data/School"));
const Requierment = lazy(() => import("./admin/main_data/Requierment"));
const TitutionFee = lazy(() => import("./admin/main_data/TitutionFee"));
const Annoucement = lazy(() => import("./admin/main_data/Annoucement"));
const Schedules = lazy(() => import("./admin/main_data/Schedules"));
const Contacts = lazy(() => import("./admin/main_data/Contacts"));
const Questionnaires = lazy(() => import("./admin/main_data/Questionnaires"));
const Registars = lazy(() => import("./admin/enrollment/Registars"));
const Accepted = lazy(() => import("./admin/enrollment/Accepted"));
const Rejected = lazy(() => import("./admin/enrollment/Rejected"));
const Payments = lazy(() => import("./admin/repots/Payments"));
const Statistic = lazy(() => import("./admin/repots/Statistic"));
const ChatPage = lazy(() => import("./admin/chats/ChatPage"));
const Detail = lazy(() => import("./admin/enrollment/Detail"));
const Setting = lazy(() => import("./admin/setting/Setting"));

function App() {
  const dispatch = useDispatch();
  const [load] = useLoadMutation();

  useEffect(() => {
    const login = localStorage.getItem("login");

    if (login) {
      load()
        .unwrap()
        .then((user) => {
          dispatch(setLogin(user));
        });
    }
  }, [dispatch, load]);
  return (
    <BrowserRouter>
      <ToastContainer autoClose={2500} />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Homepage />} />

          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />

          <Route path="/admin" element={<AdminPage />} />

          <Route path="/admin/jenjang" element={<Homebase />} />

          <Route path="/admin/tapel" element={<AcademicYear />} />

          <Route path="/admin/sekolah" element={<School />} />

          <Route path="/admin/persyaratan" element={<Requierment />} />

          <Route path="/admin/biaya" element={<TitutionFee />} />

          <Route path="/admin/pengumuman" element={<Annoucement />} />

          <Route path="/admin/jadwal" element={<Schedules />} />

          <Route path="/admin/narahubung" element={<Contacts />} />

          <Route path="/admin/kuisioner" element={<Questionnaires />} />

          <Route path="/admin/pelajar" element={<Registars />} />

          <Route path="/admin/pelajar/diterima" element={<Accepted />} />

          <Route path="/admin/pelajar/ditolak" element={<Rejected />} />

          <Route path="/admin/pelajar/:id/:nama" element={<Detail />} />

          <Route path="/admin/pembayaran" element={<Payments />} />

          <Route path="/admin/statistik" element={<Statistic />} />

          <Route path="/admin/pesan" element={<ChatPage />} />

          <Route path="/admin/pengaturan" element={<Setting />} />

          {/* Pendaftar */}

          <Route path="/user/dashboard" element={<UserPage />} />

          <Route path="/user/formulir" element={<Formulir />} />

          <Route path="/user/pembayaran" element={<Payment />} />

          <Route path="/user/profil" element={<Profile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
