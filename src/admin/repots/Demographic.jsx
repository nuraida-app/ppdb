import React, { Fragment } from "react";
import { useGetDemographicQuery } from "../../api/service/staticticApi";
import { Paper, Typography } from "@mui/material";
import DataTable from "./DataTable";

const Demographic = () => {
  const { data } = useGetDemographicQuery();

  return (
    <Fragment>
      <Paper sx={{ p: 1 }}>
        <Typography fontWeight="bold">Provinsi</Typography>
        {data && <DataTable data={data?.provinsi} />}
      </Paper>

      <Paper sx={{ p: 1 }}>
        <Typography fontWeight="bold">Kota / Kabupaten</Typography>
        {data && <DataTable data={data?.regional} />}
      </Paper>

      <Paper sx={{ p: 1 }}>
        <Typography fontWeight="bold">Kecamatan</Typography>
        {data && <DataTable data={data?.kecamatan} />}
      </Paper>

      <Paper sx={{ p: 1 }}>
        <Typography fontWeight="bold">Desa</Typography>
        {data && <DataTable data={data?.desa} />}
      </Paper>
    </Fragment>
  );
};

export default Demographic;
