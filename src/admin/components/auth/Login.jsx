import React, { useEffect, useState } from "react";
import "./styles.css";
import { Box } from "@mui/material";
import {
  useAdminLoginMutation,
  useLoadMutation,
} from "../../../api/service/authApi";
import { toast } from "react-toastify";
import { setLogin } from "../../../api/features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [adminLogin, { data, isLoading, isSuccess, error }] =
    useAdminLoginMutation();
  const [load] = useLoadMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();

    const data = { email, password };

    adminLogin(data);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("login", JSON.stringify("login"));
      load()
        .unwrap()
        .then((user) => {
          dispatch(setLogin(user));
        });
      toast.success(data.message);
      navigate("/admin");

      window.location.reload();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [data, isSuccess, error]);

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>

      <div className="form-wrapper">
        <form onSubmit={loginHandler}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Masuk</button>
        </form>
      </div>
    </Box>
  );
};

export default Login;
