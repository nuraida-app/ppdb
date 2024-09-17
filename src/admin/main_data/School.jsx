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
import {
  useAddSchoolMutation,
  useDeleteSchoolMutation,
  useGetSchoolQuery,
  useGetSchoolsQuery,
} from "../../api/service/schoolApi";
import { toast } from "react-toastify";

const School = () => {
  const [schoolId, setSchoolId] = useState("");
  const [name, setName] = useState("");

  const { data } = useGetSchoolsQuery();
  const { data: detail } = useGetSchoolQuery(schoolId, {
    skip: !schoolId,
  });

  const [addSchool, { data: message, isSuccess, isLoading, error, reset }] =
    useAddSchoolMutation();
  const [
    deleteSchool,
    {
      data: delMsg,
      isSuccess: delSuccess,
      isLoading: delLoad,
      error: delError,
    },
  ] = useDeleteSchoolMutation();

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      name,
      id: schoolId ? schoolId : null,
    };

    addSchool(data);
  };

  const deleteHandler = (id) => {
    deleteSchool(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      setName("");
      setSchoolId("");
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [message, error, isSuccess]);

  useEffect(() => {
    if (delSuccess) {
      toast.success(delMsg.message);
    }

    if (delError) {
      toast.error(delError.data.message);
    }
  }, [delMsg, delError, delSuccess]);

  useEffect(() => {
    if (detail) {
      setName(detail.nama);
    }
  }, [detail]);

  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 8 }}>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {["No", "Sekolah", "Aksi"].map((item) => (
                      <TableCell key={item} align="center">
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{item.nama}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="warning"
                          onClick={() => setSchoolId(item.id)}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => deleteHandler(item.id)}
                        >
                          <DoNotDisturbOnOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 4 }} sx={{ py: 1, px: 4 }}>
          <Paper sx={{ p: 1 }}>
            <form onSubmit={submitHandler}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Input
                  fullWidth
                  type="text"
                  placeholder="Tambah Jenjang"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                />

                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <IconButton type="submit">
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

export default School;
