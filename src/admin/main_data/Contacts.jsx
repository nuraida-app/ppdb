import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Box,
  Button,
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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import {
  useAddContactMutation,
  useDeleteContactMutation,
  useGetContactQuery,
  useGetContactsQuery,
} from "../../api/service/contactApi";
import { toast } from "react-toastify";

const convertPhoneNumber = (phone) => {
  if (phone?.startsWith("0")) {
    return `62${phone.slice(1)}`;
  }
  return phone;
};

const Contacts = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { data: contacts } = useGetContactsQuery();
  const { data: contact } = useGetContactQuery(id, { skip: !id });
  const [addContact, { data, isSuccess, error, isLoading, reset }] =
    useAddContactMutation();
  const [
    deleteContact,
    {
      data: delMsg,
      isSuccess: delSuccess,
      error: delError,
      isLoading: delLoad,
      reset: delReset,
    },
  ] = useDeleteContactMutation();

  const submitHandler = (e) => {
    e.preventDefault();

    const data = { name, phone, id: id ? id : null };

    addContact(data);
  };

  const deleteHandler = (id) => deleteContact(id);

  useEffect(() => {
    if (contact) {
      setName(contact.nama);
      setPhone(contact.tlp);
      setId(contact.id);
    }
  }, [contact]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      setName("");
      setPhone("");
      setId("");
      reset();
    }

    if (error) {
      reset();
      toast.error(error.data.message);
    }
  }, [isSuccess, error, data]);

  useEffect(() => {
    if (delSuccess) {
      toast.success(delMsg.message);
    }

    if (delError) {
      toast.error(delError.data.message);
    }
  }, [delSuccess, delError, delMsg]);

  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 8 }}>
          <Paper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {["No", "Nama", "No Whatsapp", "Aksi"].map((item) => (
                      <TableCell key={item} align="center">
                        {item}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contacts?.map((contact, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell>{contact.nama}</TableCell>
                      <TableCell align="center">{contact.tlp}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="warning"
                          onClick={() => setId(contact.id)}
                        >
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => deleteHandler(contact.id)}
                        >
                          {delLoad ? (
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
        <Grid2 item size={{ xs: 12, md: 4 }} sx={{ py: 1, px: 4 }}>
          <Paper sx={{ p: 1 }}>
            <form onSubmit={submitHandler}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Input
                  type="text"
                  placeholder="Nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Input
                  type="number"
                  placeholder="No Whatsapp"
                  value={phone}
                  onChange={(e) => setPhone(convertPhoneNumber(e.target.value))}
                />

                <Box alignSelf="end">
                  <Button variant="contained" color="success" type="submit">
                    {isLoading ? <CircularProgress size={24} /> : "Simpan"}
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Contacts;
