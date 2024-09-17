import {
  Box,
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";
import {
  useAddAppNameMutation,
  useGetAppQuery,
} from "../../api/service/appApi";
import { toast } from "react-toastify";
import Admin from "./Admin";

const Setting = () => {
  const [addAppName, { data, isLoading, error, isSuccess, reset }] =
    useAddAppNameMutation();
  const { data: app } = useGetAppQuery();

  const [name, setName] = useState("");

  const appHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
    };

    addAppName(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    if (app) {
      setName(app?.nama);
    }
  }, [app]);
  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 6 }} sx={{ px: 1 }}>
          <Paper
            sx={{ p: 1, display: "flex", gap: 2, flexDirection: "column" }}
          >
            <Typography variant="h6" fontWeight="bold">
              Pengaturan
            </Typography>
            <form onSubmit={appHandler}>
              <TextField
                label="Nama Aplikasi"
                placeholder="Nama Aplikasi"
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />

              <Box align="end" sx={{ mt: 1 }}>
                <Button variant="contained" color="success">
                  Simpan
                </Button>
              </Box>
            </form>
          </Paper>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 6 }} sx={{ px: 1 }}>
          <Admin />
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Setting;
