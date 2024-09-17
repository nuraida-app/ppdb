import { Box, Paper, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useGetDataPaymentsQuery } from "../../api/service/staticticApi";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";

// Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController
);

// Function to generate the last 7 days including today
const getLast7Days = () => {
  const today = new Date();
  const days = [];

  for (let i = 6; i >= 0; i--) {
    const day = new Date();
    day.setDate(today.getDate() - i);
    days.push(day.toLocaleDateString("id-ID"));
  }

  return days;
};

// Function to map payments to the corresponding dates
const mapPaymentsToDates = (days, data) => {
  const datePaymentMap = {};

  // Initialize all dates to 0
  days.forEach((day) => {
    datePaymentMap[day] = 0;
  });

  // Fill the map with actual payment data where available
  data?.forEach((item) => {
    const itemDate = new Date(item.createdat).toLocaleDateString("id-ID");
    const nominalValue = parseInt(item.nominal);

    if (datePaymentMap[itemDate] !== undefined) {
      datePaymentMap[itemDate] += nominalValue;
    }
  });

  return Object.values(datePaymentMap);
};

const Data2 = () => {
  const { data, error, isLoading } = useGetDataPaymentsQuery();
  const [labels, setLabels] = useState([]);
  const [nominal, setNominal] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const last7Days = getLast7Days();
    setLabels(last7Days);

    if (data) {
      const mappedNominal = mapPaymentsToDates(last7Days, data);
      setNominal(mappedNominal);
    }
  }, [data]);

  useEffect(() => {
    if (chartRef.current && labels.length > 0 && nominal.length > 0) {
      const ctx = chartRef.current.getContext("2d");

      new ChartJS(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Nominal (Rp)",
              data: nominal,
              fill: true,
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Pembayaran dalam 7 Hari Terakhir",
            },
          },
        },
      });
    }
  }, [labels, nominal]);

  return (
    <Paper sx={{ flex: 2, p: 2, mt: 1 }}>
      {/* Render Chart.js line chart */}
      {labels.length > 0 && nominal.length > 0 ? (
        <canvas ref={chartRef}></canvas>
      ) : (
        <Typography>Data tidak tersedia</Typography>
      )}
    </Paper>
  );
};

export default Data2;
