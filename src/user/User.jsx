import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../api/service/userApi";
import { toast } from "react-toastify";

const User = () => {
  const { user } = useSelector((state) => state.user);
  const [updateUser, { data, isSuccess, error, isLoading }] =
    useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const updateHandler = (e) => {
    e.preventDefault();

    const data = {
      id: user.id,
      name,
      email,
      phone,
      password,
    };

    updateUser(data);
  };

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
      setPhone(user?.phone);
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      window.location.reload();
    }

    if (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  }, [data, isSuccess, error]);

  return (
    <Fragment>
      <Paper sx={{ p: 1 }}>
        <Typography fontWeight="bold">User Info</Typography>
        <form className="user-info" onSubmit={updateHandler}>
          <TextField
            label="Username"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="No Whatsapp"
            type="text"
            value={phone || ""}
            onChange={(e) => setPhone(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <TextField
            label="Password baru"
            type="password"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />

          <Box alignSelf="end">
            <Button variant="contained" color="success" type="submit">
              {isLoading ? <CircularProgress size={24} /> : "simpan"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Fragment>
  );
};

export default User;
