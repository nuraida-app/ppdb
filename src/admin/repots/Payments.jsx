import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  useConfirmPaymentMutation,
  useGetPaymentsQuery,
} from "../../api/service/paymentApi";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TextField,
  Input,
} from "@mui/material";
import { toast } from "react-toastify";

const Payments = () => {
  const { data: payments } = useGetPaymentsQuery();
  const [confirmPayment, { data, isSuccess, isLoading, error, reset }] =
    useConfirmPaymentMutation();

  // State untuk pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // State untuk pencarian
  const [searchTerm, setSearchTerm] = useState("");

  const confirm = (id) => {
    confirmPayment(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error]);

  // Handler untuk mengubah halaman
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handler untuk mengubah jumlah baris per halaman
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset ke halaman pertama setiap kali jumlah baris per halaman berubah
  };

  // Handler untuk mengubah kata kunci pencarian
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter data berdasarkan pencarian nama
  const filteredPayments = payments?.filter((item) =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Data yang akan ditampilkan berdasarkan pagination
  const paginatedPayments = filteredPayments?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Layout>
      <Paper>
        <Box p={2}>
          {/* Input untuk pencarian */}
          <Input
            type="text"
            placeholder="Cari Bedasarkan Nama"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {["No", "Nama", "Nominal", "Berkas", "Status", "Aksi"].map(
                  (item) => (
                    <TableCell key={item} align="center">
                      {item}
                    </TableCell>
                  )
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedPayments?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">
                    {page * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell align="center">{`Rp ${parseFloat(
                    item.nominal
                  ).toLocaleString("id-ID")}`}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      href={item.bukti}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </Button>
                  </TableCell>
                  <TableCell align="center">
                    <Typography>{item.status}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color={
                        item.status === "Terkonfirmasi" ? "success" : "error"
                      }
                      onClick={() => confirm(item.user_id)}
                    >
                      {item.status === "Terkonfirmasi" ? "Diterima" : "Terima"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredPayments?.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 20, 50, 100]}
          labelRowsPerPage="Tampilkan baris"
        />
      </Paper>
    </Layout>
  );
};

export default Payments;
