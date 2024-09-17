import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Box,
  Button,
  CircularProgress,
  Grid2,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useSelector } from "react-redux";
import {
  useMyPaymentQuery,
  useUploadPaymentMutation,
} from "../api/service/paymentApi";
import { toast } from "react-toastify";
import { useGetPostsQuery } from "../api/service/postApi";

const createMarkup = (html) => {
  return { __html: html };
};

const Payment = () => {
  const category = "pembayaran";

  const { data: posts } = useGetPostsQuery(category);
  const { user } = useSelector((state) => state.user);

  const [uploadPayment, { data, isSuccess, isLoading, error, reset }] =
    useUploadPaymentMutation();
  const {
    data: payment,
    isLoading: loading,
    refetch,
  } = useMyPaymentQuery(user?.id, {
    skip: !user?.id,
  });

  const [file, setFile] = useState(null);
  const [price, setPrice] = useState(0);

  const formatCurrency = (value) => {
    const number = value.replace(/[^\d]/g, "");
    return `Rp ${parseInt(number, 10).toLocaleString("id-ID")}`;
  };

  const parseCurrency = (value) => {
    return value.replace(/[^\d]/g, ""); // remove 'Rp' and any non-numeric characters
  };

  const priceHandler = (e) => {
    setPrice(formatCurrency(e.target.value));
  };

  const inputFile = (e) => {
    const img = e.target.files[0];
    setFile(img);
  };

  const submitHandler = () => {
    const data = new FormData();

    data.append("name", user.name);
    data.append("price", parseCurrency(price));
    data.append("file", file);

    uploadPayment(data);
  };

  const openLink = () => {
    window.open(payment.bukti, "_blank");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      reset();
      refetch();
    }

    if (error) {
      console.log(error);
      toast.error(error.data.message);
      reset();
    }
  }, [isSuccess, error, data]);

  return (
    <Layout>
      <Grid2 container>
        <Grid2
          item
          size={{ xs: 12, md: 8 }}
          sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h5">Pembayaran</Typography>
          <Paper sx={{ p: 1 }}>
            {posts?.map((post, index) => (
              <Typography
                key={index}
                variant="body1"
                dangerouslySetInnerHTML={createMarkup(post.teks)}
              />
            ))}
          </Paper>
        </Grid2>
        <Grid2
          item
          size={{ xs: 12, md: 4 }}
          sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h6">Upload Bukti Pembayaran</Typography>

          <Paper>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">:</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{ textTransform: "none" }}
                    >
                      {payment?.status
                        ? payment.status
                        : "Belum ada pembayaran"}
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Berkas</TableCell>
                  <TableCell align="center">:</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      sx={{ textTransform: "none" }}
                      onClick={openLink}
                    >
                      Link
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Paper>

          {!payment && (
            <Paper
              sx={{ p: 1, display: "flex", flexDirection: "column", gap: 1 }}
            >
              <TextField
                variant="standard"
                value={price}
                onChange={priceHandler}
              />

              <Input type="file" onChange={inputFile} accept="images/*" />

              <Box alignSelf="end">
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<DriveFolderUploadOutlinedIcon />}
                  onClick={submitHandler}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Upload"}
                </Button>
              </Box>
            </Paper>
          )}
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Payment;
