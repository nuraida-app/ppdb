import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  TextField,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLoadMutation, useRegisterMutation } from "../api/service/authApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../api/features/authSlice";
import "./styles.css";

const Signup = ({ open, close }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { data, isLoading, isSuccess, error }] =
    useRegisterMutation();
  const [load] = useLoadMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const closeHandler = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    close();
  };

  const signUpHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Password tidak sama");
    }

    const data = {
      name,
      email,
      password,
    };

    register(data);
  };

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("login", JSON.stringify("login"));
      toast.success(data.message);
      load()
        .unwrap()
        .then((user) => {
          dispatch(setLogin(user));
        });
      navigate("/user/dashboard");
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [data, isSuccess, error]);

  return (
    <Modal open={open} onClose={closeHandler} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: 350, md: 400 },
            bgcolor: "#ffff",
            boxShadow: 24,
            p: 2,
            borderRadius: "5px",
          }}
        >
          <form className="form" onSubmit={signUpHandler}>
            <TextField
              label="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              fullWidth
              required
            />

            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              fullWidth
              required
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Konfirmasi Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
            />

            <Box sx={{ display: "flex", gap: 1, justifyContent: "end" }}>
              <Button
                variant="outlined"
                sx={{ textTransform: "none" }}
                onClick={closeHandler}
              >
                Tutup
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ textTransform: "none" }}
              >
                {isLoading ? <CircularProgress size={24} /> : "Daftar"}
              </Button>

              <Button
                variant="contained"
                color="error"
                startIcon={<GoogleIcon />}
                sx={{ textTransform: "none" }}
              >
                Google
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Signup;
