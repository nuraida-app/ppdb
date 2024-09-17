import { Box, Paper, Typography } from "@mui/material";
import React, { Fragment } from "react";

const createMarkup = (html) => {
  return { __html: html };
};

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-EN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date);
  } catch (error) {
    console.error("Invalid date string:", dateString);
    return "Invalid date";
  }
};

const Announcements = ({ data }) => {
  return (
    <Fragment>
      <Typography variant="h6">Pengumuman</Typography>

      {data?.map((item) => (
        <Paper
          key={item.id}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            mt: 1,
            px: 4,
            py: 2,
          }}
        >
          <Typography fontWeight={700}>{item.judul}</Typography>
          <Box dangerouslySetInnerHTML={createMarkup(item.teks)} />
          <Typography variant="body2" fontSize={10} align="right">
            {formatDate(item.createdat)}
          </Typography>
        </Paper>
      ))}
    </Fragment>
  );
};

export default Announcements;
