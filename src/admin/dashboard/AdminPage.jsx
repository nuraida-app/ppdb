import React from "react";
import Layout from "../components/layout/Layout";
import Data1 from "./Data1";
import Data2 from "./Data2";
import { useGetDataQuery } from "../../api/service/staticticApi";
import { Grid2, Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const AdminPage = () => {
  const { data } = useGetDataQuery();
  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 8 }} sx={{ p: 1 }}>
          <Data1 result={data} />

          <Data2 />
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 4 }} sx={{ p: 1 }}>
          <Paper>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider>
          </Paper>
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default AdminPage;
