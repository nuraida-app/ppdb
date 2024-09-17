import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import ListMenu from "../menus/ListMenu";
import Protect from "../auth/Protect";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../api/features/authSlice";
import { useLogoutMutation } from "../../../api/service/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useGetAppQuery } from "../../../api/service/appApi";

const Layout = ({ children }) => {
  Protect();

  const { data: app } = useGetAppQuery();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout, { data, isSuccess, isLoading }] = useLogoutMutation();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    setAnchorEl(null);

    try {
      await logout().unwrap(); // Pastikan logout API berhasil
      localStorage.removeItem("login");
      dispatch(setLogout()); // Hapus user dari state Redux
      navigate("/"); // Arahkan ke halaman utama setelah logout
    } catch (error) {
      console.error("Logout failed: ", error); // Menangani error jika ada
    }
  };

  const settingPage = () => {
    setAnchorEl(null);
    navigate("/admin/pengaturan");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: 250, height: "100vh", overflow: "auto" }}>
        <Box sx={{ px: 3, py: 2.8, textAlign: "center" }}>
          <Typography fontWeight="bold">{app?.nama}</Typography>
        </Box>

        <ListMenu />
      </Box>
      <Box sx={{ width: "100%", bgcolor: "#E9EFEC" }}>
        <Box sx={{ py: 2, bgcolor: blue[500] }}>
          <Container>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                startIcon={<AdminPanelSettingsIcon />}
                endIcon={<ArrowDropDownIcon />}
                sx={{ alignSelf: "end", color: "white" }}
                onClick={handleClick}
              >
                Administrator
              </Button>
            </Box>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={settingPage}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItem>Pengaturan</ListItem>
              </MenuItem>
              <MenuItem onClick={logoutHandler}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItem>Logout</ListItem>
              </MenuItem>
            </Menu>
          </Container>
        </Box>
        <Box sx={{ mt: 1, p: 2, height: "88vh", overflow: "auto" }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
