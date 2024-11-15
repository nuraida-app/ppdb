import React from "react";
import Layout from "../components/layout/Layout";
import { useGetAccountsQuery } from "../../api/service/userApi";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const AdminUser = () => {
  const { data, isLoading } = useGetAccountsQuery();

  return (
    <Layout>
      <Paper>
        <TableContainer sx={{ height: { md: 500, lg: 750 } }}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center">No</TableCell>
                  <TableCell align="center">Nama</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">WhatsApp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="center">
                      <Button
                        startIcon={<WhatsAppIcon />}
                        variant="contained"
                        color="success"
                        onClick={() =>
                          window.open(`https://wa.me/${user.phone}`, "_blank")
                        }
                      >
                        {user.phone}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Paper>
    </Layout>
  );
};

export default AdminUser;
