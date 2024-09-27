import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  IconButton,
  Input,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import {
  useAcceptedMutation,
  useGetFormsQuery,
  useRejectedMutation,
} from "../../api/service/formApi";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./styles.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const colums = [
  { label: "No", width: 40 },
  { label: "Kode Pendaftaran", width: 80 },
  { label: "Pendaftar", width: 120 },
  { label: "Whatsapp", width: 120 },
  { label: "Status", width: 80 },
  { label: "Aksi", width: 30 },
];

const Registars = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedBerkas, setSelectedBerkas] = useState([]);

  const open = Boolean(anchorEl);
  const handleClick = (event, id, name, berkas) => {
    setAnchorEl(event.currentTarget);
    setUserId(id);
    setName(name);
    setSelectedBerkas(berkas || []);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // actions
  const [
    accepted,
    { data: aMsg, isSuccess: aSuccess, error: aError, reset: aReset },
  ] = useAcceptedMutation();
  const [
    rejected,
    { data: rMsg, isSuccess: rSuccess, error: rError, reset: rReset },
  ] = useRejectedMutation();

  const { data: registars } = useGetFormsQuery();

  const status = registars?.filter((r) => r.status_pendaftaran === "Diproses");

  const filteredData = status?.filter((item) =>
    item.kode_pendaftaran.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const accpetHandler = () => {
    accepted(userId);
    handleClose();
  };

  const rejectHandler = () => {
    rejected(userId);
    handleClose();
  };

  useEffect(() => {
    if (aSuccess) {
      toast.success(aMsg.message);
      aReset();
    }

    if (aError) {
      toast.error(aError.data.message);
      aReset();
    }
  }, [aMsg, aSuccess, aError]);

  useEffect(() => {
    if (rSuccess) {
      toast.success(rMsg.message);
      rReset();
    }

    if (rError) {
      toast.error(rError.data.message);
      rReset();
    }
  }, [rMsg, rSuccess, rError]);

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Detail page
  const detailPage = () => {
    const formattedName = name.replace(/\s+/g, "-");

    navigate(`/admin/pelajar/${userId}/${formattedName}`);
  };

  return (
    <Layout>
      <Paper sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Pendaftar Baru
        </Typography>

        {/* Search Input */}
        <Input
          type="text"
          placeholder="Kode Pendaftaran"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ my: 1 }}
        />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {colums.map((item, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{ minWidth: item.width }}
                  >
                    {item.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell align="center">
                      {item.kode_pendaftaran}
                    </TableCell>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>
                      <ListItemButton
                        onClick={() =>
                          window.open(
                            `https://wa.me/${item.tlp_ayah}`,
                            "_blank"
                          )
                        }
                      >
                        <ListItemAvatar>
                          <WhatsAppIcon color="success" />
                        </ListItemAvatar>
                        <ListItemText
                          primary="Ayah"
                          secondary={item.tlp_ayah}
                        />
                      </ListItemButton>

                      <ListItemButton
                        onClick={() =>
                          window.open(`https://wa.me/${item.tlp_ibu}`, "_blank")
                        }
                      >
                        <ListItemAvatar>
                          <WhatsAppIcon color="success" />
                        </ListItemAvatar>
                        <ListItemText primary="ibu" secondary={item.tlp_ibu} />
                      </ListItemButton>
                    </TableCell>
                    <TableCell align="center">
                      <div className="menunggu">{item.status_pendaftaran}</div>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        color="primary"
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={(e) =>
                          handleClick(e, item.userid, item.nama, item.berkas)
                        }
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination Component */}
        <TablePagination
          component="div"
          count={filteredData?.length || 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="Rows per page"
        />
      </Paper>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={accpetHandler}>Diterima</MenuItem>
        <MenuItem onClick={rejectHandler}>Ditolak</MenuItem>
        <MenuItem onClick={detailPage}>Detail</MenuItem>
      </Menu>
    </Layout>
  );
};

export default Registars;
