import { Fragment } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Typography, Grid2 } from "@mui/material";
import Info from "./Info";
import Announcements from "../components/announce/Announcements";
import { useGetPostsQuery } from "../api/service/postApi";

const Homepage = () => {
  const category = "pengumuman";
  const { data } = useGetPostsQuery(category);
  return (
    <Layout>
      <Grid2 container sx={{ px: { xs: 1, md: 12 } }}>
        <Grid2 item size={{ xs: 12, md: 9 }} sx={{ p: 1 }}>
          <Announcements data={data} />
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 3 }} sx={{ p: 1 }}>
          <Info />
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Homepage;
