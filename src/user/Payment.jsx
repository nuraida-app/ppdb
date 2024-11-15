import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/layout/Layout";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useSelector } from "react-redux";
import {
  useMyPaymentQuery,
  useUploadPaymentMutation,
} from "../api/service/paymentApi";
import { toast } from "react-toastify";
import { useGetPostsQuery } from "../api/service/postApi";
import { useGetFormQuery } from "../api/service/formApi";
import ReactToPrint from "react-to-print";
import { useGetAppQuery } from "../api/service/appApi";

const createMarkup = (html) => {
  return { __html: html };
};

const Payment = () => {
  const { data: app } = useGetAppQuery();
  const { data: dPosts } = useGetPostsQuery();
  const { user } = useSelector((state) => state.user);
  const { data: profile } = useGetFormQuery(user?.id, { skip: !user?.id });

  const posts = dPosts?.filter((d) => d.kategori === "pembayaran");

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
  const [price, setPrice] = useState("");
  const [media, setMedia] = useState("Instagram");

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
    if (!media || !price || !file) {
      alert("Pastikan semua data terisi");
      return;
    }

    const data = new FormData();

    data.append("name", user.name);
    data.append("media", media);
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

  const boxRef = useRef();

  return (
    <Layout>
      <Grid2 container>
        <Grid2
          item
          size={{ xs: 12, md: 8 }}
          sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h5">Pembayaran</Typography>

          {payment?.status === "Terkonfirmasi" && (
            <Paper sx={{ p: 1 }}>
              <Box
                ref={boxRef}
                sx={{ display: "flex", flexDirection: "column", gap: 1, p: 1 }}
              >
                <img
                  src={app?.kop_surat}
                  style={{ height: 120, objectFit: "cover" }}
                />
                <table>
                  <tbody>
                    <tr>
                      <td style={{ width: "200px" }}>Invoice</td>
                      <td align="center" style={{ width: "15px" }}>
                        :
                      </td>
                      <td>
                        <p>{new Date(payment?.createdat).getTime()}</p>
                      </td>
                    </tr>
                    <tr>
                      <td>Tanggal Pembayaran</td>
                      <td align="center">:</td>
                      <td>
                        <p>
                          {new Date(payment?.createdat).toLocaleDateString(
                            "id-ID",
                            { hour: "numeric", minute: "numeric" }
                          )}
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ width: "200px" }}>Atas Nama</td>
                      <td align="center" style={{ width: "15px" }}>
                        :
                      </td>
                      <td>{user?.name}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "200px" }}>Pembayaran</td>
                      <td align="center" style={{ width: "15px" }}>
                        :
                      </td>
                      <td>PPDB</td>
                    </tr>
                    <tr>
                      <td style={{ width: "200px" }}>Nominal</td>
                      <td align="center" style={{ width: "15px" }}>
                        :
                      </td>
                      <td>{`Rp ${parseFloat(payment?.nominal).toLocaleString(
                        "id-ID"
                      )}`}</td>
                    </tr>
                  </tbody>
                </table>

                <Box
                  alignSelf="end"
                  sx={{
                    width: 200,
                    height: 100,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p>{`Bogor, ${new Date(payment?.createdat).toLocaleDateString(
                    "id-ID"
                  )}`}</p>

                  <img
                    src={app?.cap}
                    alt="logo"
                    style={{
                      height: "50px",
                      width: "50px",
                      objectFit: "cover",
                    }}
                  />

                  <p>Petugas PPDB</p>
                </Box>
              </Box>
            </Paper>
          )}

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
                {payment && (
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
                )}

                {payment?.status === "Terkonfirmasi" && (
                  <TableRow>
                    <TableCell>Invoice</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>
                      <ReactToPrint
                        trigger={() => (
                          <Button
                            variant="contained"
                            color="success"
                            startIcon={<LocalPrintshopIcon />}
                          >
                            Print
                          </Button>
                        )}
                        content={() => boxRef.current}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>

          {!payment && (
            <Paper
              sx={{ p: 1, display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <InputLabel>Didapatkan dari mana informasi Nuraida?</InputLabel>
                <Select
                  label="Didapatkan dari mana informasi Nuraida?"
                  value={media}
                  onChange={(e) => setMedia(e.target.value)}
                  required
                >
                  <MenuItem value="Instagram">Instagram</MenuItem>
                  <MenuItem value="YouTube">YouTube</MenuItem>
                  <MenuItem value="Brosur">Brosur</MenuItem>
                  <MenuItem value="Pameran">Pameran</MenuItem>
                  <MenuItem value="Website">Website</MenuItem>
                  <MenuItem value="Kerabat">Kerabat</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Nominal Pembayaran"
                size="small"
                placeholder="Masukan nominal tanpa Rp dan ."
                required
                slotProps={{ inputLabel: { shrink: true } }}
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
