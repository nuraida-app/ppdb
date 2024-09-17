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
  useAddHealthMutation,
  useDeleteHealthMutation,
  useGetHealtFormQuery,
} from "../api/service/formApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Health = () => {
  const { user } = useSelector((state) => state.user);
  const { data: notes, refetch } = useGetHealtFormQuery(user?.id, {
    skip: !user?.id,
  });
  const [addHealth, { isSuccess, isLoading, error, reset }] =
    useAddHealthMutation();
  const [deleteHealth, { delSuccess, delError, delReset }] =
    useDeleteHealthMutation();

  const [healthNote, setHealthNote] = useState("");
  const [editingId, setEditingId] = useState(null); // For editing notes

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      userId: user?.id,
      note: {
        id: editingId || Date.now(),
        note_kesehatan: healthNote,
      },
    };

    addHealth(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Data berhasil disimpan");
      setHealthNote("");
      setEditingId(null);
      reset();
      refetch(); // Refresh the table after adding a note
    }

    if (error) {
      toast.error("Gagal menyimpan data");
      reset();
    }
  }, [isSuccess, error, reset, refetch]);

  useEffect(() => {
    if (delSuccess) {
      toast.success("Data berhasil dihapus");
      delReset();
      refetch(); // Refresh the table after deleting a note
    }

    if (delError) {
      toast.error("Gagal menghapus data");
      delReset();
    }
  }, [delSuccess, delError, delReset, refetch]);

  const handleEdit = (note) => {
    setHealthNote(note.note_kesehatan);
    setEditingId(note.id);
  };

  const handleDelete = (noteId) => {
    const data = {
      userId: user?.id,
      noteId,
    };
    deleteHealth(data);
  };

  return (
    <Box sx={{ mt: 1 }}>
      <form className="formulir" onSubmit={submitHandler}>
        <TextField
          label="Catatan Kesehatan"
          value={healthNote}
          onChange={(e) => setHealthNote(e.target.value)}
        />

        <Box alignSelf="end">
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
                {["No", "Catatan", "Aksi"].map((item) => (
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
                  <TableCell>{item.note_kesehatan}</TableCell>
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

export default Health;
