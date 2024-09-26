import React from "react";
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
import {
  useGetAnswerQuery,
  useGetQuizzesQuery,
} from "../../api/service/quizApi";

const createMarkup = (html) => {
  return { __html: html };
};

const Answer = ({ id }) => {
  const { data } = useGetQuizzesQuery();
  const { data: answers } = useGetAnswerQuery(id, { skip: !id });

  const type1 = data?.filter(
    (d) => d.jenis === "Kuisioner" && d.pengisi === "Ortu"
  );
  const type2 = data?.filter(
    (d) => d.jenis === "Angket" && d.pengisi === "Ortu"
  );

  const type3 = data?.filter(
    (d) => d.jenis === "Angket" && d.pengisi === "Tholibah"
  );
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <div>
        <Typography variant="h6" fontWeight="bold">
          Kuisioner Orang Tua
        </Typography>
      </div>

      {type1?.map((item) => (
        <div key={item.id}>
          <Box>
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

          <Divider />
        </div>
      ))}

      {type2?.map((item) => (
        <div key={item.id}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: 500, mr: 2 }}>
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
          Kuisioner Tholibah
        </Typography>
      </div>

      {type3?.map((item) => (
        <div key={item.id}>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: 500, mr: 2 }}>
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
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </Box>
          <Divider />
        </div>
      ))}
    </Box>
  );
};

export default Answer;
