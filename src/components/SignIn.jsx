import React, { useEffect, useState, useCallback } from "react";
import "./component.css";
import { Link, useNavigate } from "react-router-dom";
import {
  useLoadMutation,
  useLoginMutation,
} from "../api/services/ApiAuthorize";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../api/features/Authorize";
import { toast } from "react-toastify";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, signIn } = useSelector((state) => state.user);
  const [login, { data, isLoading, error, isSuccess }] = useLoginMutation();
  const [load] = useLoadMutation();

  const [formData, setFormData] = useState({ email: "", password: "" });

  // Function to handle input change
  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const submitHandler = (e) => {
    e.preventDefault();
    login(formData);
  };

  const loadUser = useCallback(() => {
    load()
      .unwrap()
      .then((user) => {
        dispatch(setLogin(user));
      });
  }, [load]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data.message);
      loadUser();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error, data]);

  useEffect(() => {
    if (signIn) {
      if (user.peran === "user") {
        navigate("/user/beranda");
      } else {
        navigate("/admin/beranda");
      }
    }
  }, [signIn, user]);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center gap-3"
      style={{ height: "100vh" }}
    >
      <img src="/logo.png" alt="logo Nibs" width="100" />
      <form
        onSubmit={submitHandler}
        className="d-flex flex-column gap-2"
        style={{ width: 350 }}
      >
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            name="email"
            value={formData.email}
            onChange={inputChange}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={inputChange}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <button
          className="btn btn-primary w-100 py-2"
          type="submit"
          disabled={isSuccess}
        >
          {isSuccess ? (
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "MASUK"
          )}
        </button>

        <div className="d-flex gap-3 justify-content-between">
          <p className="m-0">
            <Link to={"/reset"} className="text-decoration-none">
              Lupa Password?
            </Link>
          </p>

          <p className="text-end m-0">
            <Link to={"/daftar"} className="text-decoration-none">
              Belum punya Akun?
            </Link>
          </p>
        </div>

        <p className="mt-2 mb-3 text-body-secondary text-center">© 2024</p>
      </form>
    </div>
  );
};

export default SignIn;
