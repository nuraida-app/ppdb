import {
  Box,
  LinearProgress,
  linearProgressClasses,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useGetMediaQuery } from "../../api/service/staticticApi";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));

const icons = {
  Kerabat: "/market.png",
  Instagram: "/instagram.png",
  YouTube: "/youtube.png",
  Pameran: "/target.png",
  Brosur: "/brochure.png",
  Website: "/web-link.png",
};

const Media = () => {
  const { data } = useGetMediaQuery();

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="h6" fontWeight={700}>
        Media Analisis
      </Typography>

      {data?.map((item, index) => (
        <Box
          key={index}
          sx={{ display: "flex", gap: 1, alignItems: "center", mt: 2 }}
        >
          {/* Check if media icon exists, otherwise default */}
          <img
            src={icons[item.media] || "/default.png"}
            alt={item.media}
            style={{ height: 30, width: 30, objectFit: "cover" }}
          />

          <Tooltip title={item.media} placement="top-end">
            <Stack sx={{ flexGrow: 1 }}>
              <BorderLinearProgress
                variant="determinate"
                value={item.percentage} // Ensure percentage is numeric
              />
            </Stack>
          </Tooltip>

          <Typography>{`${item.percentage}%`}</Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default Media;
