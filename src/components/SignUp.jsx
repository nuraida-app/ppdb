import React from "react";
import "./component.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center gap-3"
      style={{ height: "100vh" }}
    >
      <img src="/logo.png" alt="logo Nibs" width="100" />
      <form className="d-flex flex-column gap-2" style={{ width: 350 }}>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="nameInput"
            placeholder="Nama Calon Santriwari"
          />
          <label htmlFor="nameInput">Nama Calon Santriwati</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            className="form-control"
            placeholder="No Whatsapp"
            id="phoneNumber"
          />
          <label htmlFor="phoneNumber">No Whatsapp</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          DAFTAR
        </button>

        <p className="text-end">
          <Link to={"/masuk"} className="text-decoration-none">
            Sudah punya akun?
          </Link>
        </p>
        <p className="mt-2 mb-3 text-body-secondary text-center">© 2024</p>
      </form>
    </div>
  );
};

export default SignUp;
