import React, { useEffect } from "react";
import AdminMenu from "./AdminMenu";
import UserMenu from "./UserMenu";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../api/services/ApiAuthorize";
import { setLogout } from "../api/features/Authorize";
import TabName from "./TabName";
import Protected from "./Protected";

const Layout = ({ children, title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logout, { isloading, error }] = useLogoutMutation();

  const { user } = useSelector((state) => state.user);

  const logutHandler = async () => {
    try {
      await logout().unwrap();

      dispatch(setLogout());

      navigate("/");
    } catch (error) {
      console.log(error.data.message);
    }
  };

  return (
    <div style={{ zIndex: 1810 }}>
      <TabName title={title} />
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap py-2 shadow">
        <a
          className="navbar-brand col-md-3 col-lg-2 px-3 me-0 mx-5"
          href={user?.peran === "user" ? "user-beranda" : "admin-beranda"}
        >
          {user?.nama}
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed bg-warning"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-nav me-sm-4 me-0">
          <button
            className="nav-item text-nowrap btn btn-danger"
            onClick={logutHandler}
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="container-fluid">
        <div className="row">
          {user?.peran === "user" ? <UserMenu /> : <AdminMenu />}

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 ">
            <div
              style={{ minHeight: "88vh", marginTop: 10 }}
              className="container d-flex flex-column shadow py-2 rounded "
            >
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
