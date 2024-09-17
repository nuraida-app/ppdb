import React from "react";
import Layout from "../components/layout/Layout";
import { useParams } from "react-router-dom";
import { useGetFormQuery } from "../../api/service/formApi";
import { Grid2 } from "@mui/material";
import Profile from "./Profile";
import Attachment from "./Attachment";

const Detail = () => {
  const params = useParams();
  const { id } = params;

  const { data } = useGetFormQuery(id, { skip: !id });

  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 7 }} sx={{ px: 1 }}>
          {data && <Profile profile={data} />}
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 5 }} sx={{ px: 1 }}>
          {data && <Attachment data={data} />}
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Detail;
