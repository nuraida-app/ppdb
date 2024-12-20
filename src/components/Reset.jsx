import React from "react";

const Reset = () => {
  return (
    <div
      className="d-flex flex-column gap-2 align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <p className="m-0 fst-italic">
        Pastikan Email sudah terdaftar sebelumnya
      </p>
      <form style={{ width: 350 }} className="d-flex flex-column gap-2">
        <div className="form-floating ">
          <input
            type="email"
            id="emailInput"
            className="form-control"
            placeholder="Masukan Email"
          />
          <label htmlFor="emailInpur">Masukan Email</label>
        </div>

        <button className="btn btn-warning">Reset Password</button>
      </form>

      <p className="fst-italic">Periksan folder spam pada email</p>
    </div>
  );
};

export default Reset;
