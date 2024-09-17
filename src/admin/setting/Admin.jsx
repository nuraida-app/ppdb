import { Box, Button, CircularProgress, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  useGetAdminQuery,
  useUpdateAdminMutation,
} from "../../api/service/userApi";
import { toast } from "react-toastify";

const Admin = () => {
  const { data: admin } = useGetAdminQuery();
  const [updateAdmin, { data, isSuccess, isLoading, error, reset }] =
    useUpdateAdminMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    updateAdmin(data);
  };

  useEffect(() => {
    if (admin) {
      setName(admin?.name);
      setEmail(admin?.email);
    }
  }, [admin]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setName("");
      setEmail("");
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);
  return (
    <Paper sx={{ px: 1, py: 2 }}>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={submitHandler}
      >
        <TextField
          label="Nama"
          type="text"
          slotProps={{ inputLabel: { shrink: true } }}
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email"
          type="email"
          slotProps={{ inputLabel: { shrink: true } }}
          value={email || ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password Lama"
          type="password"
          slotProps={{ inputLabel: { shrink: true } }}
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box align="end">
          <Button variant="contained" color="success" type="submit">
            {isLoading ? <CircularProgress size={24} /> : " Simpan"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Admin;
