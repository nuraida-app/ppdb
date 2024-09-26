import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  useAddUserShceduleMutation,
  useDelUserScheduleMutation,
  useGetSchedulesQuery,
  useGetUserScheduleQuery,
} from "../api/service/scheduleApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const Schedule = () => {
  const { user } = useSelector((state) => state.user);
  const [addUserSchedule, { data: msg, isSuccess, isLoading, error, reset }] =
    useAddUserShceduleMutation();
  const { data: schedules } = useGetUserScheduleQuery(user?.id, {
    skip: !user?.id,
  });
  const [
    delUserSchedule,
    {
      data: delMsg,
      isSuccess: delSuccess,
      isLoading: delLoading,
      error: delError,
      reset: delReset,
    },
  ] = useDelUserScheduleMutation();

  const { data } = useGetSchedulesQuery();
  const [time, setTime] = useState("--Pilih Jadwal--");
  const [checkup, setCheckup] = useState("--Pilih Jadwal--");

  const testSchedules = data?.filter((d) => d.jenis === "Tes" && d.kuota > 0);
  const medicalSchedules = data?.filter((d) => d.jenis === "MCU");

  const testHandler = (id) => {
    setTime(id);
    const schedule = data?.find((d) => d.id === id);

    const testSchedule = {
      user_id: user?.id,
      schedule_id: schedule?.id,
      activity: schedule?.kegiatan,
      time: schedule?.waktu,
      mode: schedule?.mode,
      type: schedule?.jenis,
    };

    addUserSchedule(testSchedule);
  };

  const checkHandler = (id) => {
    setCheckup(id);
    const schedule = data?.find((d) => d.id === id);

    const checkSchedule = {
      user_id: user?.id,
      schedule_id: schedule?.id,
      activity: schedule?.kegiatan,
      time: schedule?.waktu,
      mode: schedule?.mode,
      type: schedule?.jenis,
    };

    addUserSchedule(checkSchedule);
  };

  const deleteHandler = (scheduleId) => {
    const data = {
      user_id: user?.id,
      jadwal_id: scheduleId,
    };
    delUserSchedule(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(msg.message);
      setTime("--Pilih Jadwal--");
      setCheckup("--Pilih Jadwal--");
      reset();
    }

    if (error) {
      toast.error(error.data.message);
      setTime("--Pilih Jadwal--");
      setCheckup("--Pilih Jadwal--");
      reset();
    }
  }, [msg, isSuccess, error]);

  useEffect(() => {
    if (delSuccess) {
      toast.success(delMsg.message);
      delReset();
    }

    if (delError) {
      toast.error(delError.data.message);
      delReset();
    }
  }, [delMsg, delSuccess, delError]);

  return (
    <>
      {isLoading || delLoading ? (
        <Box align="center">
          <CircularProgress size={40} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {schedules && (
            <Table>
              <TableBody>
                {schedules?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.kegiatan}</TableCell>
                    <TableCell align="center">:</TableCell>
                    <TableCell>{`${new Date(item.waktu).toLocaleDateString(
                      "id-ID",
                      {
                        hour: "numeric",
                        minute: "numeric",
                      }
                    )}, ${item.mode}`}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="error"
                        onClick={() => deleteHandler(item.jadwal_id)}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <FormControl fullWidth>
            <InputLabel>Jadwal Tes</InputLabel>
            <Select
              label="Jadwal Test"
              value={time}
              onChange={(e) => testHandler(e.target.value)}
            >
              <MenuItem value="--Pilih Jadwal--">--Pilih Jadwal--</MenuItem>
              {testSchedules?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {`${item.kegiatan}, ${new Date(item.waktu).toLocaleDateString(
                    "id-ID",
                    { hour: "numeric", minute: "numeric" }
                  )}, ${item.mode}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Jadwal MCU</InputLabel>
            <Select
              label="Jadwal MCU"
              value={checkup}
              onChange={(e) => checkHandler(e.target.value)}
            >
              <MenuItem value="--Pilih Jadwal--">--Pilih Jadwal--</MenuItem>
              {medicalSchedules?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {`${item.kegiatan}, ${new Date(item.waktu).toLocaleDateString(
                    "id-ID",
                    { hour: "numeric", minute: "numeric" }
                  )}, ${item.mode}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </>
  );
};

export default Schedule;
