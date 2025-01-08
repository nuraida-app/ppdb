import React, { useEffect, useState } from "react";
import "./component.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  useLoadMutation,
  useRegisterMutation,
} from "../api/services/ApiAuthorize";
import { setLogin } from "../api/features/Authorize";
import { toast } from "react-toastify";

const convertPhoneNumber = (phone) => {
  if (phone?.startsWith("0")) {
    return `62${phone.slice(1)}`;
  }
  return phone;
};

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { data, isLoading, isSuccess, error }] =
    useRegisterMutation();
  const [load] = useLoadMutation();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const data = { name, phone, email, password };

    register(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      load()
        .unwrap()
        .then((user) => {
          dispatch(setLogin(user));
        });
      navigate("/user-beranda");
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [data, isSuccess, error]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center gap-3"
      style={{ height: "100vh" }}
    >
      <img src="/logo.png" alt="logo Nibs" width="100" />
      <form
        className="d-flex flex-column gap-2"
        style={{ width: 350 }}
        onSubmit={submitHandler}
      >
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput2"
            placeholder="Nama Calon Siswa"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="floatingInput2">Nama Calon Siswa</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="number"
            className="form-control"
            placeholder="No Whatsapp"
            id="phoneNumber"
            value={phone}
            onChange={(e) => setPhone(convertPhoneNumber(e.target.value))}
          />
          <label htmlFor="phoneNumber">No Whatsapp</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "DAFTAR"
          )}
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
