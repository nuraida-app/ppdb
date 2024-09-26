import {
  Box,
  Button,
  CircularProgress,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useEffect, useState } from "react";
import { useLoadMutation, useLoginMutation } from "../api/service/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./styles.css";
import { setLogin } from "../api/features/authSlice";

const Login = ({ open, close }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { data, isLoading, error, isSuccess }] = useLoginMutation();
  const [load] = useLoadMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const closeHandler = () => {
    setEmail("");
    setPassword("");
    close();
  };

  const loginHandler = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    login(data);
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
      navigate("/user/dashboard");

      window.location.reload();
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
          <form className="form" onSubmit={loginHandler}>
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
                {isLoading ? <CircularProgress size={24} /> : "Masuk"}
              </Button>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Login;
