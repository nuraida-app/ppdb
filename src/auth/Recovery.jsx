import React, { useEffect, useState } from "react";
import "./styles.css";
import { toast } from "react-toastify";
import {
  useFindEmailMutation,
  useRecoverPasswordMutation,
} from "../api/service/userApi";

const Recovery = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const [findEmail, { data, isSuccess, isLoading, error, reset }] =
    useFindEmailMutation();
  const [
    recoverPassword,
    { data: msg, isSuccess: rSuccess, isLoading: rLoading, error: rError },
  ] = useRecoverPasswordMutation();

  const emailHandler = (e) => {
    e.preventDefault();

    findEmail(email);
  };

  const passwordHandler = (e) => {
    e.preventDefault();

    const data = { email: user.email, password };

    recoverPassword(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setEmail("");
      reset();
      setUser(data.user);
    }

    if (error) {
      toast.error(error.data.message);
      setEmail("");
      reset();
    }
  }, [isSuccess, data, error]);

  useEffect(() => {
    if (rSuccess) {
      toast.success(msg.message);
      window.location.href = "/";
    }

    if (rError) {
      toast.error(rError.data.message);
    }
  }, [msg, rSuccess, rError]);

  return (
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

      <div className="container">
        {!user && (
          <div className="recovery-wrapper">
            <form onSubmit={emailHandler}>
              <input
                type="email"
                placeholder="Masukan Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <button type="submit">{isLoading ? "..." : "Cari"}</button>
            </form>
          </div>
        )}

        {user && (
          <div className="recovery-wrapper">
            <form onSubmit={passwordHandler}>
              <input
                type="password"
                placeholder="Buat Password Baru"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button type="submit">{rLoading ? "..." : "Pulihkan"}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recovery;
