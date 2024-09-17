import React from "react";
import Layout from "../components/layout/Layout";
import { Grid2 } from "@mui/material";
import Transactions from "./Transactions";
import Demographic from "./Demographic";

const Statistic = () => {
  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 7 }} sx={{ p: 1 }}>
          <Transactions />
        </Grid2>
        <Grid2
          item
          size={{ xs: 12, md: 5 }}
          sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Demographic />
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Statistic;
