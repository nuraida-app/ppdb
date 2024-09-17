import React from "react";
import Layout from "../components/layout/Layout";
import { Grid2, Paper } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Announcements from "../components/announce/Announcements";
import { useGetPostsQuery } from "../api/service/postApi";

const UserPage = () => {
  const category = "persyaratan";
  const { data: posts } = useGetPostsQuery(category);

  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 8 }} sx={{ p: 1 }}>
          <Announcements data={posts} />
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

export default UserPage;
