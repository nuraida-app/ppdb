import React from "react";
import "./component.css";
import { Link } from "react-router-dom";
import * as Ai from "react-icons/ai";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Hi from "react-icons/hi";
import * as Md from "react-icons/md";
import * as Ri from "react-icons/ri";
import Protected from "./Protected";

const menus = [
  { label: "Beranda", icon: <Fa.FaTachometerAlt />, link: "/admin-beranda" },
  { label: "Pembayaran", icon: <Ai.AiFillBank />, link: "/admin-pembayaran" },
  { label: "Tapel", icon: <Fa6.FaChartLine />, link: "/admin-tapel" },
  { label: "Sekolah", icon: <Fa.FaSchool />, link: "/admin-sekolah" },
  { label: "Jenjang", icon: <Fa6.FaTimeline />, link: "/admin-tingkat" },
  {
    label: "Info",
    icon: <Hi.HiOutlineSpeakerphone />,
    link: "/admin-info",
  },
  { label: "Jadwal", icon: <Fa.FaCalendarCheck />, link: "/admin-jadwal" },
  { label: "Kuisioner", icon: <Md.MdOutlineQuiz />, link: "/admin-kuisioner" },
  { label: "User", icon: <Fa.FaUsers />, link: "/admin-users" },
  { label: "Pendaftar", icon: <Fa.FaUserClock />, link: "/admin-pendaftar" },
  { label: "Diterima", icon: <Fa.FaUserCheck />, link: "/admin-diterima" },
  { label: "Ditolak", icon: <Fa.FaUserAltSlash />, link: "/admin-ditolak" },
  {
    label: "Statistik",
    icon: <Fa6.FaChartSimple />,
    link: "/admin-pusat-data",
  },
];

const AdminMenu = () => {
  Protected({ role: "admin" });
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse position-fixed top-0 start-0 h-100 mt-5"
      style={{ height: "100vh", zIndex: 100 }}
    >
      <div
        className="position-sticky pt-3 overflow-auto"
        style={{ height: "100%" }}
      >
        <ul className="nav flex-column gap-1">
          {menus.map((item) => (
            <li key={item.label} className="nav-item admin-menu">
              <Link
                id="admin-list"
                to={item.link}
                className="text-decoration-none d-flex align-items-center gap-3"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default AdminMenu;
