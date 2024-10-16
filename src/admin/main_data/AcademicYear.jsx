import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Box,
  CircularProgress,
  Grid2,
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import { green } from "@mui/material/colors";
import { toast } from "react-toastify";
import {
  useAddYearMutation,
  useDeleteYearMutation,
  useGetYearQuery,
  useGetYearsQuery,
} from "../../api/service/yearApi";

const AcademicYear = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const { data: years } = useGetYearsQuery();
  const { data: year } = useGetYearQuery(id, { skip: !id });
  const [addYear, { data, isSuccess, error, isLoading, reset }] =
    useAddYearMutation();
  const [
    deleteYear,
    {
      data: delMsg,
      isSuccess: delSuccess,
      error: delError,
      isLoading: delLoading,
    },
  ] = useDeleteYearMutation();

  const submitHandler = (e) => {
    e.preventDefault();

    const data = { id: id ? id : null, name };

    addYear(data);
  };

  const deleteHandler = (id) => {
    deleteYear(id);
  };

  useEffect(() => {
    if (year) {
      setId(year.id);
      setName(year.tapel);
    }
  }, [year]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setName("");
      setId("");
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, error, isSuccess]);

  useEffect(() => {
    if (delSuccess) {
      toast.success(delMsg.message);
    }

    if (delError) {
      toast.error(delError.data.message);
    }
  }, [delMsg, delError, delSuccess]);

  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 8 }}>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {["No", "Tahun Pelajaran", "Aksi"].map((item) => (
                      <TableCell key={item} align="center">
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {years?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.tapel}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="warning"
                          onClick={() => setId(item.id)}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => deleteHandler(item.id)}
                        >
                          {delLoading ? (
                            <CircularProgress size={24} />
                          ) : (
                            <DoNotDisturbOnOutlinedIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 4 }} sx={{ px: 4 }}>
          <Paper
            sx={{
              p: 1,
              position: "fixed",
              width: { md: 300, lg: 400, xl: 400 },
            }}
          >
            <form onSubmit={submitHandler}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Input
                  required
                  fullWidth
                  type="text"
                  placeholder="Tambah Jenjang"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />

                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <IconButton type="submit" color="success">
                    <AddIcon />
                  </IconButton>

                  {isLoading && (
                    <CircularProgress
                      size={45}
                      sx={{
                        color: green[500],
                        position: "absolute",
                        top: -2.5,
                        left: -2,
                        transform: "translate(-50%, -50%)",
                        zIndex: 1,
                      }}
                    />
                  )}
                </Box>
              </Box>
            </form>
          </Paper>
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default AcademicYear;
