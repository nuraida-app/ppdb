import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid2,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Student from "../form/Student";
import Requierment from "./Requierment";
import Address from "../form/Address";
import Parents from "../form/Parents";
import School from "../form/School";
import Health from "../form/Health";
import Attachment from "../form/Attachment";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useGetYearsQuery } from "../api/service/yearApi";
import { useGetEducationsQuery } from "../api/service/eduApi";
import { useGetSchoolsQuery } from "../api/service/schoolApi";
import Family from "../form/Family";
import { useSelector } from "react-redux";
import { useGetFormQuery } from "../api/service/formApi";
import Questionnaire from "../form/Questionnaire";
import Schedule from "../form/Schedule";

const Formulir = () => {
  const [activeTab, setActiveTab] = useState("Data Diri");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // DATA
  const { user } = useSelector((state) => state.user);
  const { data: tapel } = useGetYearsQuery();
  const { data: edu } = useGetEducationsQuery();
  const { data: schools } = useGetSchoolsQuery();
  const { data: profile } = useGetFormQuery(user?.id, { skip: !user?.id });
  const photo = profile?.berkas?.find((f) => f["Foto"])?.Foto;

  const tabs = [
    {
      name: "Data Diri",
      component: <Student tapel={tapel} edu={edu} schools={schools} />,
    },
    { name: "Alamat", component: <Address /> },
    { name: "Orang Tua", component: <Parents /> },
    { name: "Data Sekolah", component: <School /> },
    { name: "Kesehatan", component: <Health /> },
    { name: "Keluarga", component: <Family /> },
    { name: "Berkas", component: <Attachment /> },
    { name: "Jadwal", component: <Schedule /> },
    { name: "Kuisioner", component: <Questionnaire /> },
  ];

  const currentTab = tabs.find((tab) => tab.name === activeTab)?.component;

  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 2 }} sx={{ p: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
              mb: 2,
              p: 1,
            }}
          >
            <Avatar
              sx={{ width: 80, height: 80 }}
              alt={profile?.nama}
              src={photo}
            />
            <Typography variant="body2">Status Pendaftaran</Typography>
            <Button variant="contained" color="warning">
              {profile?.status_pendaftaran}
            </Button>
          </Box>
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 7 }} sx={{ px: 2, py: 1 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleClick}
            sx={{ mb: 2 }}
          >
            {activeTab}
          </Button>

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {tabs.map((tab) => (
              <MenuItem
                key={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                  handleClose();
                }}
              >
                {tab.name}
              </MenuItem>
            ))}
          </Menu>

          {currentTab}
        </Grid2>

        <Grid2 item size={{ xs: 12, md: 3 }} sx={{ p: 1 }}>
          <Requierment />
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default Formulir;
