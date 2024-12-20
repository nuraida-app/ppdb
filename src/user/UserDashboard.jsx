import React from "react";
import Layout from "../components/Layout";
import * as Ai from "react-icons/ai";
import * as Fa from "react-icons/fa";
import * as Fa6 from "react-icons/fa6";
import * as Md from "react-icons/md";
import * as Ri from "react-icons/ri";
import { Link } from "react-router-dom";

const menus = [
  {
    label: "Pembayaran",
    icon: <Ai.AiOutlineBank size={50} />,
    link: "/user/pembayaran",
  },
  {
    label: "Data Diri",
    icon: <Fa6.FaUserTag size={50} />,
    link: "/user/data-diri",
  },
  {
    label: "Orang Tua",
    icon: <Ri.RiParentFill size={50} />,
    link: "/user/orang-tua",
  },
  {
    label: "Keluarga",
    icon: <Md.MdFamilyRestroom size={50} />,
    link: "/user/keluarga",
  },
  {
    label: "Alamat",
    icon: <Fa.FaAddressCard size={50} />,
    link: "/user/alamat",
  },
  { label: "Sekolah", icon: <Fa.FaSchool size={50} />, link: "/user/sekolah" },
  {
    label: "Kesehatan",
    icon: <Fa.FaHospitalSymbol size={50} />,
    link: "/user/kesehatan",
  },
  {
    label: "Berkas",
    icon: <Fa6.FaFolderTree size={50} />,
    link: "/user/berkas",
  },
  {
    label: "Penjadwalan",
    icon: <Fa.FaCalendarCheck size={50} />,
    link: "/user/jadwal",
  },
  {
    label: "Kuisioner",
    icon: <Md.MdQuiz size={50} />,
    link: "/user/kuisioner",
  },
];

const UserDashboard = () => {
  return (
    <Layout>
      <div className="d-flex gap-4 flex-wrap justify-content-center">
        {menus.map((item, index) => (
          <Link key={index} className="text-decoration-none" to={item.link}>
            <div
              className={`d-flex flex-column align-items-center justify-content-center bg-danger text-white rounded p-2`}
              style={{ width: 100 }}
            >
              {item.icon}

              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default UserDashboard;
