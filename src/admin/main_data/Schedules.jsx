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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  useAddScheduleMutation,
  useDeleteScheduleMutation,
  useGetScheduleQuery,
  useGetSchedulesQuery,
} from "../../api/service/scheduleApi";
import { toast } from "react-toastify";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";

dayjs.extend(utc);
dayjs.extend(timezone);

const Schedules = () => {
  const [id, setId] = useState("");
  const [type, setType] = useState("Tes");
  const [name, setName] = useState("");
  const [time, setTime] = useState(null);
  const [mode, setMode] = useState("Online");
  const [quota, setQuota] = useState("");

  const { data: schedules } = useGetSchedulesQuery();
  const { data: schedule } = useGetScheduleQuery(id, { skip: !id });
  const [addSchedule, { data: message, isSuccess, error, isLoading, reset }] =
    useAddScheduleMutation();
  const [
    deleteSchedule,
    {
      data: delMsg,
      isSuccess: delSuccess,
      error: delError,
      isLoading: delLoading,
    },
  ] = useDeleteScheduleMutation();

  const handleTime = (date) => {
    const localTime = dayjs(date).tz("Asia/Jakarta");

    setTime(localTime);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      id: id ? id : null,
      type,
      name,
      time,
      mode,
      quota,
    };

    addSchedule(data);
  };

  const deleteHandler = (id) => deleteSchedule(id);

  useEffect(() => {
    if (schedule) {
      setId(schedule?.id);
      setType(schedule?.jenis);
      setName(schedule?.kegiatan);
      setTime(dayjs(schedule?.waktu).tz("Asia/Jakarta"));
      setMode(schedule?.mode);
      setQuota(schedule?.kuota);
    }
  }, [schedule]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(message.message);
      setId("");
      setType("Test");
      setName("");
      setTime("");
      setMode("Online");
      setQuota("");
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
  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 9 }} sx={{ px: 1 }}>
          <Paper sx={{ p: 1 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {[
                      "Waktu",
                      "Jenis",
                      "Kegiatan",
                      "Mode",
                      "Kuota",
                      "Aksi",
                    ].map((item) => (
                      <TableCell key={item} align="center">
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {schedules?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell align="center">
                        {new Date(item.waktu).toLocaleDateString("id-ID", {
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </TableCell>
                      <TableCell align="center">{item.jenis}</TableCell>
                      <TableCell align="center">{item.kegiatan}</TableCell>
                      <TableCell align="center">{item.mode}</TableCell>
                      <TableCell align="center">{item.kuota}</TableCell>
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
        <Grid2 item size={{ xs: 12, md: 3 }}>
          <Paper sx={{ px: 1, py: 2 }}>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
              onSubmit={submitHandler}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Tanggal & Jam"
                    value={time || null}
                    onChange={handleTime}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <FormControl fullWidth>
                <InputLabel>Jenis</InputLabel>
                <Select
                  value={type || ""}
                  onChange={(e) => setType(e.target.value)}
                  label="Jenis"
                  required
                >
                  <MenuItem value="Tes">Tes</MenuItem>
                  <MenuItem value="MCU">MCU</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Kegiatan"
                placeholder="Kegiatan"
                fullWidth
                required
                slotProps={{ inputLabel: { shrink: true } }}
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel>Moda</InputLabel>
                <Select
                  value={mode || ""}
                  onChange={(e) => setMode(e.target.value)}
                  label="Moda"
                  required
                >
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="Offline">Offline</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Kuota"
                placeholder="Kuota"
                fullWidth
                required
                slotProps={{ inputLabel: { shrink: true } }}
                value={quota || ""}
                onChange={(e) => setQuota(e.target.value)}
              />

              <Button variant="contained" color="success" type="submit">
                {isLoading ? <CircularProgress size={24} /> : "simpan"}
              </Button>
            </form>
          </Paper>
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Schedules;
