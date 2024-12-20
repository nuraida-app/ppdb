import React from "react";
import "./component.css";
import { Link } from "react-router-dom";
import * as Ai from "react-icons/ai";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Md from "react-icons/md";
import * as Ri from "react-icons/ri";
import Protect from "./Protected";
import { useSelector } from "react-redux";

const menus = [
  { label: "Beranda", icon: <Fa.FaTachometerAlt />, link: "/user/beranda" },
  { label: "Pembayaran", icon: <Ai.AiOutlineBank />, link: "/user/pembayaran" },
  { label: "Data Diri", icon: <Fa6.FaUserTag />, link: "/user/data-diri" },
  { label: "Orang Tua", icon: <Ri.RiParentFill />, link: "/user/orang-tua" },
  { label: "Keluarga", icon: <Md.MdFamilyRestroom />, link: "/user/keluarga" },
  { label: "Alamat", icon: <Fa.FaAddressCard />, link: "/user/alamat" },
  { label: "Sekolah", icon: <Fa.FaSchool />, link: "/user/sekolah" },
  {
    label: "Kesehatan",
    icon: <Fa.FaHospitalSymbol />,
    link: "/user/kesehatan",
  },
  { label: "Berkas", icon: <Fa6.FaFolderTree />, link: "/user/berkas" },
  { label: "Kuisioner", icon: <Md.MdQuiz />, link: "/user/kuisioner" },
];

const UserMenu = () => {
  Protect({ role: "user" });
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

export default UserMenu;
