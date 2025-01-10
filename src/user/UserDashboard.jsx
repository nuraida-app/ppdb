import React, { useState } from "react";
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
    link: "/user-pembayaran",
  },
  {
    label: "Data Diri",
    icon: <Fa6.FaUserTag size={50} />,
    link: "/user-data-diri",
  },
  {
    label: "Orang Tua",
    icon: <Ri.RiParentFill size={50} />,
    link: "/user-orang-tua",
  },
  {
    label: "Keluarga",
    icon: <Md.MdFamilyRestroom size={50} />,
    link: "/user-keluarga",
  },
  {
    label: "Alamat",
    icon: <Fa.FaAddressCard size={50} />,
    link: "/user-alamat",
  },
  { label: "Sekolah", icon: <Fa.FaSchool size={50} />, link: "/user-sekolah" },
  {
    label: "Berkas",
    icon: <Fa6.FaFolderTree size={50} />,
    link: "/user-berkas",
  },
  {
    label: "Kuisioner",
    icon: <Md.MdQuiz size={50} />,
    link: "/user-kuisioner",
  },
];

const UserDashboard = () => {
  const [open, setOpen] = useState(true);

  const close = () => setOpen(false);

  const openWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?phone=6287720776871`, "_blank");
  };
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

      {open && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div
            className="modal d-block"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Pemberitahuan</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={close}
                  ></button>
                </div>
                <div className="modal-body">
                  <p className="text-center">
                    Terimakasih telah menggunakan portal resmi PPDB Nuraida
                  </p>
                  <p className="text-center">
                    Sehubungan dengan adanya update sistem pada portal ini,
                    terdapat kekurangan data Keluarga
                  </p>
                  <p className="text-center">
                    Bagi pengguna yang sudah mengimput data keluarga diharapkan
                    dapat mengimput kebambali
                  </p>
                  <div className="modal-footer mt-2">
                    <button className="btn btn-success" onClick={openWhatsapp}>
                      Tim IT NIBS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
};

export default UserDashboard;
