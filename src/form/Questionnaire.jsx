import React, { useEffect, useState } from "react";
import {
  useCreateAnswerMutation,
  useGetAnswerQuery,
  useGetQuizzesQuery,
} from "../api/service/quizApi";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const createMarkup = (html) => {
  return { __html: html };
};

const Questionnaire = () => {
  const { user } = useSelector((state) => state.user);
  const { data } = useGetQuizzesQuery();
  const { data: answers } = useGetAnswerQuery(user?.id, { skip: !user?.id });
  const [createAnswer, { data: message, isSuccess, isLoading, error, reset }] =
    useCreateAnswerMutation();

  const type1 = data?.filter(
    (d) => d.jenis === "Kuisioner" && d.pengisi === "Ortu"
  );
  const type2 = data?.filter(
    (d) => d.jenis === "Angket" && d.pengisi === "Ortu"
  );

  const type3 = data?.filter(
    (d) => d.jenis === "Angket" && d.pengisi === "Tholibah"
  );

  const [open, setOpen] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [answer, setAnswer] = useState("");
  const [checkAnswers, setCheckAnswers] = useState({});

  const openHandler = (id) => {
    const existingAnswer = answers?.find((ans) => ans.quizId === id);
    setQuizId(id);
    setAnswer(existingAnswer?.answer || "");
    setOpen(true);
  };

  const handleCheckAnswer = (quizId, value) => {
    setCheckAnswers((prev) => ({ ...prev, [quizId]: value }));

    // Simpan jawaban saat checkbox di-check
    addAnswerForAngket(quizId, value);
  };

  const addAnswerForKuisioner = () => {
    const dataToSend = {
      userId: user?.id,
      answer, // This is for Kuisioner, a text answer
      quizId,
    };

    createAnswer(dataToSend);
  };

  const addAnswerForAngket = (quizId, value) => {
    const dataToSend = {
      userId: user?.id,
      answer: value, // Jawaban "Ya" atau "Tidak" dari checkbox
      quizId,
    };

    createAnswer(dataToSend);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(message?.message);
      setQuizId("");
      setAnswer("");
      setOpen(false);
      reset();
    }

    if (error) {
      toast.error(error.data.message);
    }
  }, [message, isSuccess, error, reset]);

  console.log(checkAnswers);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <div>
        <Typography variant="h6" fontWeight="bold">
          Kuisioner
        </Typography>
        <Typography fontSize={10} variant="body2">
          DIisi Oleh Orang Tua
        </Typography>
      </div>

      {type1?.map((item) => (
        <div key={item.id}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "90%" }}>
              <Typography>{item.soal}</Typography>
              <Typography
                variant="body2"
                fontStyle="italic"
                dangerouslySetInnerHTML={createMarkup(
                  answers?.find((ans) => ans.soal_id === item.id)?.jawaban ||
                    "Belum dijawab"
                )}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton color="primary" onClick={() => openHandler(item.id)}>
                <EditNoteIcon />
              </IconButton>
            </Box>
          </Box>
          <Divider />
        </div>
      ))}

      {type2?.map((item) => (
        <div key={item.id}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: 600, mr: 2 }}>
              <Typography>{item.soal}</Typography>
            </Box>

            <FormControl>
              <FormGroup row>
                <FormControlLabel
                  value="Ya"
                  label="Ya"
                  labelPlacement="end"
                  control={
                    <Checkbox
                      checked={
                        answers?.find((ans) => ans.soal_id === item.id)
                          ?.jawaban === "Ya"
                      }
                      onChange={() => handleCheckAnswer(item.id, "Ya")}
                    />
                  }
                />
                <FormControlLabel
                  value="Tidak"
                  label="Tidak"
                  labelPlacement="end"
                  control={
                    <Checkbox
                      checked={
                        answers?.find((ans) => ans.soal_id === item.id)
                          ?.jawaban === "Tidak"
                      }
                      onChange={() => handleCheckAnswer(item.id, "Tidak")}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Divider />
        </div>
      ))}

      <div>
        <Typography variant="h6" fontWeight="bold">
          Kuisioner
        </Typography>
        <Typography fontSize={10} variant="body2">
          DIisi Oleh Calon Tholibah
        </Typography>
      </div>

      {type3?.map((item) => (
        <div key={item.id}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: 600, mr: 2 }}>
              <Typography>{item.soal}</Typography>
            </Box>

            <FormControl component="fieldset">
              <FormGroup row>
                <FormControlLabel
                  value="Ya"
                  label="Ya"
                  labelPlacement="end"
                  control={
                    <Checkbox
                      checked={
                        answers?.find((ans) => ans.soal_id === item.id)
                          ?.jawaban === "Ya"
                      }
                      onChange={() => handleCheckAnswer(item.id, "Ya")}
                    />
                  }
                />
                <FormControlLabel
                  value="Tidak"
                  label="Tidak"
                  labelPlacement="end"
                  control={
                    <Checkbox
                      checked={
                        answers?.find((ans) => ans.soal_id === item.id)
                          ?.jawaban === "Tidak"
                      }
                      onChange={() => handleCheckAnswer(item.id, "Tidak")}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Divider />
        </div>
      ))}

      <Modal open={open} onClose={() => setOpen(false)}>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 1,
            }}
          >
            <Box sx={{ maxHeight: 400 }}>
              <ReactQuill theme="snow" value={answer} onChange={setAnswer} />
            </Box>

            <Box sx={{ display: "flex", gap: 1, justifyContent: "end", mt: 4 }}>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setOpen(false)}
              >
                tutup
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={addAnswerForKuisioner}
              >
                Simpan
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default Questionnaire;
