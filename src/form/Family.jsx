import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useSelector } from "react-redux";
import {
  useAddFamilyMutation,
  useDeleteFamilyMutation,
  useGetFamilyFormQuery,
} from "../api/service/formApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Family = () => {
  const { user } = useSelector((state) => state.user);
  const { data: notes, refetch } = useGetFamilyFormQuery(user?.id, {
    skip: !user?.id,
  });
  const [addFamily, { data, isSuccess, isLoading, error, reset }] =
    useAddFamilyMutation();
  const [
    deleteFamily,
    { isSuccess: delSuccess, error: delError, reset: delReset },
  ] = useDeleteFamilyMutation();

  const [family, setFamily] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      userId: user?.id,
      note: {
        id: editingId || Date.now(),
        nama: family,
        tanggal_lahir: birthDate || null,
      },
    };

    addFamily(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setFamily("");
      setBirthDate("");
      setEditingId(null);
      reset();
      refetch(); // Refresh the table after adding a note
    }

    if (error) {
      toast.error(error.data.message);
      reset();
    }
  }, [data, isSuccess, error, reset, refetch]);

  useEffect(() => {
    if (delSuccess) {
      toast.success("Data berhasil dihapus");
      delReset();
      refetch(); // Refresh the table after deleting a note
    }

    if (delError) {
      toast.error(delError.data.message);
      delReset();
    }
  }, [delSuccess, delError, delReset, refetch]);

  const handleEdit = (family) => {
    setFamily(family.nama);
    setBirthDate(family.tanggal_lahir);
    setEditingId(family.id);
  };

  const handleDelete = (familyId) => {
    const data = {
      userId: user?.id,
      familyId,
    };
    deleteFamily(data);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <form className="formulir" onSubmit={submitHandler}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <TextField
            label="Nama"
            size="small"
            value={family}
            onChange={(e) => setFamily(e.target.value)}
          />
          <TextField
            type="date"
            size="small"
            label="Tanggal Lahir"
            slotProps={{ inputLabel: { shrink: true } }}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />

          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ textTransform: "none" }}
          >
            {isLoading ? <CircularProgress size={24} /> : "Simpan"}
          </Button>
        </Box>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                {["No", "Nama", "Lahir", "Aksi"].map((item) => (
                  <TableCell key={item} align="center">
                    {item}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {notes?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell align="center">{item.tanggal_lahir}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleEdit(item)}
                      color="warning"
                    >
                      <EditOutlinedIcon />
                    </IconButton>

                    <IconButton
                      onClick={() => handleDelete(item.id)}
                      color="error"
                    >
                      <RemoveCircleOutlineOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </form>
    </Box>
  );
};

export default Family;
