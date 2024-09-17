import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Fragment, useState } from "react";
import Login from "../../auth/Login";
import Signup from "../../auth/Signup";
import { Link, useNavigate } from "react-router-dom";
import { Icon, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import OutputIcon from "@mui/icons-material/Output";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../api/features/authSlice";
import { useLogoutMutation } from "../../api/service/authApi";
import Protect from "./Protect";
import { useMyPaymentQuery } from "../../api/service/paymentApi";
import ChatsIcon from "../chats/ChatsIcon";
import { useGetAppQuery } from "../../api/service/appApi";

const page = ["masuk", "daftar"];
const userPage = ["Dashboard", "Pembayaran", "Formulir", "Profil"];

const Layout = ({ children }) => {
  Protect();

  const { data: app } = useGetAppQuery();

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [logout, { data, isSuccess, isLoading }] = useLogoutMutation();

  const { data: payment } = useMyPaymentQuery(user?.id, { skip: !user?.id });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const [loginPage, setLogin] = useState(false);
  const [signupPage, setSignup] = useState(false);

  const clickHandler = (name) => {
    if (name === "masuk") {
      setLogin(true);
    }

    if (name === "daftar") {
      setSignup(true);
    }
  };

  const toPage = (item) => {
    handleClose();

    navigate(`/user/${item}`);
  };

  const logoutHandler = async () => {
    try {
      await logout().unwrap(); // Ensure the logout API succeeds
      localStorage.removeItem("login");
      dispatch(setLogout()); // Remove user from Redux state
      navigate("/"); // Redirect to the main page after logout
    } catch (error) {
      console.error("Logout failed: ", error); // Handle error if any
    }
  };

  return (
    <Fragment>
      <AppBar position="fixed">
        <Container>
          <Toolbar disableGutters>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <img src="/nibs.png" style={{ width: 50, height: 50 }} />
              <Typography>{app?.nama}</Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              {!user &&
                page.map((item) => (
                  <Button
                    key={item}
                    sx={{ my: 2, color: "white", display: "block" }}
                    onClick={() => clickHandler(item)}
                  >
                    {item}
                  </Button>
                ))}

              {user?.role === "user" &&
                userPage.map((item) => {
                  const isHidden =
                    (item === "Formulir" || item === "Profil") &&
                    (payment === null ||
                      payment?.status === "Menunggu Konfirmasi");

                  return (
                    <Button
                      key={item}
                      sx={{
                        display: isHidden
                          ? "none"
                          : { xs: "none", md: "block" },
                        my: 2,
                        color: "white",
                        textTransform: "none",
                      }}
                      onClick={() => toPage(item)}
                    >
                      {item}
                    </Button>
                  );
                })}

              {user?.role === "admin" && (
                <Button
                  sx={{
                    color: "white",
                    display: { xs: "none", md: "block" },
                    textTransform: "none",
                  }}
                  component={Link}
                  to="/admin"
                >
                  Admin Dashboard
                </Button>
              )}

              {user && (
                <IconButton
                  sx={{ display: { xs: "none", md: "flex" }, color: "inherit" }}
                  onClick={logoutHandler}
                >
                  <OutputIcon />
                </IconButton>
              )}

              <IconButton
                sx={{ display: { xs: "block", md: "none" }, color: "inherit" }}
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {userPage.map((item) => (
                  <MenuItem key={item} onClick={() => toPage(item)}>
                    {item}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        sx={{
          position: "absolute",
          top: 80,
          width: "100%",
        }}
      >
        <Container sx={{ minHeight: { xs: "90vh", md: "86vh" } }}>
          {children}
        </Container>
        <Container>
          <Typography align="right" fontSize={12}>
            Privacy Policy
          </Typography>
        </Container>
      </Box>

      <Login open={loginPage} close={() => setLogin(false)} />
      <Signup open={signupPage} close={() => setSignup(false)} />

      <ChatsIcon />
    </Fragment>
  );
};

export default Layout;
