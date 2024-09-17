import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import React, { useState } from "react";
import { useGetPaymentsQuery } from "../../api/service/paymentApi";

const getTodayDate = () => {
  return new Date().toISOString().slice(0, 10);
};

const Transactions = () => {
  const { data, isLoading, error } = useGetPaymentsQuery();

  const [start, setStart] = useState(getTodayDate()); // Start with today's date
  const [end, setEnd] = useState(getTodayDate()); // End with today's date

  const filterByDate = () => {
    const filtered = data?.filter((item) => {
      const paymentDate = new Date(item.createdat);
      const startDate = start ? new Date(start) : null;
      const endDate = end ? new Date(end) : null;

      // Mengabaikan waktu, hanya membandingkan tanggal
      const normalizeDate = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      };

      const normalizedPaymentDate = normalizeDate(paymentDate);
      const normalizedStartDate = startDate ? normalizeDate(startDate) : null;
      const normalizedEndDate = endDate ? normalizeDate(endDate) : null;

      if (normalizedStartDate && normalizedEndDate) {
        const condition =
          normalizedPaymentDate >= normalizedStartDate &&
          normalizedPaymentDate <= normalizedEndDate;
        return condition;
      } else if (normalizedStartDate) {
        const condition = normalizedPaymentDate >= normalizedStartDate;
        return condition;
      } else if (normalizedEndDate) {
        const condition = normalizedPaymentDate <= normalizedEndDate;
        return condition;
      }
      return true; // Jika tidak ada filter, tampilkan semua
    });

    console.log("Filtered Result:", filtered); // Debug hasil filter
    return filtered;
  };

  const result = filterByDate();

  const totalTransactions = result?.reduce(
    (acc, item) => acc + Number(item.nominal),
    0
  );

  return (
    <Paper sx={{ px: 1, py: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <TextField
          type="date"
          size="small"
          label="Dari"
          slotProps={{ inputLabel: { shrink: true } }}
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />

        <TextField
          type="date"
          size="small"
          label="Sampai"
          slotProps={{ inputLabel: { shrink: true } }}
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {["No", "Nama", "Nominal", "Tanggal"].map((item) => (
                <TableCell key={item} align="center">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {result?.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell align="center">{`Rp ${parseFloat(
                  item.nominal
                ).toLocaleString("id-ID")}`}</TableCell>
                <TableCell align="center">
                  {new Date(item.createdat).toLocaleDateString("id-ID")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <p>{`Laporan Tanggal: ${new Date(start).toLocaleDateString(
                  "id-ID"
                )} - ${new Date(end).toLocaleDateString("id-ID")}`}</p>
                <p>{`Pendapatan: Rp ${parseFloat(
                  totalTransactions
                ).toLocaleString("id-ID")}`}</p>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Transactions;
