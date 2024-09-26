import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid2,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {
  useAddQuizMutation,
  useDeleteQuizMutation,
  useGetQuizQuery,
  useGetQuizzesQuery,
} from "../../api/service/quizApi";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import { toast } from "react-toastify";

const Questionnaires = () => {
  const [id, setId] = useState("");
  const [type, setType] = useState("pilih");
  const [input, setInput] = useState("pilih");
  const [question, setQuestion] = useState("");

  const { data: quizzes } = useGetQuizzesQuery();
  const { data: quiz } = useGetQuizQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  const [addQuiz, { data: message, isSuccess, isLoading, error, reset }] =
    useAddQuizMutation();
  const [
    deleteQuiz,
    {
      data: delMsg,
      isSuccess: delSuccess,
      error: delError,
      isLoading: delLoading,
    },
  ] = useDeleteQuizMutation();

  const submitHandler = (e) => {
    e.preventDefault();

    const data = { id: id || null, type, question, input };

    addQuiz(data);
  };

  const deleteHandler = (id) => deleteQuiz(id);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      setType("pilih");
      setQuestion("");
      setInput("pilih");
      setId("");
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
    if (quiz) {
      setId(quiz?.id);
      setType(quiz?.jenis);
      setQuestion(quiz?.soal);
      setInput(quiz?.pengisi);
    }
  }, [quiz]);
  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 1, mx: 1 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {["Jenis", "Pengisi", "Pertanyaan", "Aksi"].map((item) => (
                      <TableCell key={item} align="center">
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {quizzes?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center" style={{ maxWidth: 100 }}>
                        {item.jenis}
                      </TableCell>
                      <TableCell>{item.pengisi}</TableCell>
                      <TableCell>{item.soal}</TableCell>
                      <TableCell align="center" style={{ width: 150 }}>
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
        <Grid2 item size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 1, mx: 1 }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
              onSubmit={submitHandler}
            >
              <FormControl fullWidth>
                <InputLabel>Jenis</InputLabel>
                <Select
                  value={type || ""}
                  onChange={(e) => setType(e.target.value)}
                  label="Jenis"
                  required
                >
                  <MenuItem value="pilih">--Pilih Jenis--</MenuItem>
                  <MenuItem value="Kuisioner">Kuisioner</MenuItem>
                  <MenuItem value="Angket">Angket</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Pengisi</InputLabel>
                <Select
                  value={input || ""}
                  onChange={(e) => setInput(e.target.value)}
                  label="Jenis"
                  required
                >
                  <MenuItem value="pilih">--Pilih Pengisi--</MenuItem>
                  <MenuItem value="Ortu">Orang Tua</MenuItem>
                  <MenuItem value="Tholibah">Calon Tholibah</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Pertanyaan"
                placeholder="Pertanyaan"
                multiline
                rows={6}
                fullWidth
                slotProps={{ inputLabel: { shrink: true } }}
                value={question || ""}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <Button
                variant="contained"
                color="success"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "simpan"}
              </Button>
            </form>
          </Paper>
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Questionnaires;
