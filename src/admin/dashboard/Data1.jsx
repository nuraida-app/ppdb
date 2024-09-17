import { Box, Paper, Typography } from "@mui/material";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import React from "react";

const BoxData = ({ item }) => {
  return (
    <Paper sx={{ px: 2, py: 2, display: "flex", gap: 1 }}>
      <Box
        sx={{
          bgcolor: item.color,
          width: 60,
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
        }}
      >
        <PeopleAltOutlinedIcon sx={{ color: "white", fontSize: 40 }} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ color: "#5E5E5E" }}
        >
          {item.label}
        </Typography>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ color: "#5E5E5E" }}
        >
          {item.label === "Pembayaran"
            ? `Rp ${parseFloat(item.number).toLocaleString("id-ID")}`
            : item.number}
        </Typography>
      </Box>
    </Paper>
  );
};

const Data1 = ({ result }) => {
  const mainData = [
    { label: "Pendaftar", color: "#CD382A", number: result?.pendaftar },
    { label: "Transaksi", color: "#2D7F26", number: result?.transaksi },
    { label: "Pembayaran", color: "#896B20", number: result?.totalTransaksi },
  ];
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {mainData.map((data, index) => (
        <BoxData key={index} item={data} />
      ))}
    </Box>
  );
};

export default Data1;
