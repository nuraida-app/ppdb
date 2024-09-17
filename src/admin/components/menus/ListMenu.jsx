import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import PersonOffOutlinedIcon from "@mui/icons-material/PersonOffOutlined";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import DonutLargeOutlinedIcon from "@mui/icons-material/DonutLargeOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import { Link } from "react-router-dom";

const data1 = [
  {
    label: "Tahun Ajaran",
    link: "/admin/tapel",
    icon: <EventNoteOutlinedIcon color="primary" />,
  },
  {
    label: "Jenjang",
    link: "/admin/jenjang",
    icon: <TimelineOutlinedIcon color="primary" />,
  },
  {
    label: "Sekolah",
    link: "/admin/sekolah",
    icon: <SchoolOutlinedIcon color="primary" />,
  },
  {
    label: "Persyaratan",
    link: "/admin/persyaratan",
    icon: <AttachFileOutlinedIcon color="primary" />,
  },
  {
    label: "Biaya",
    link: "/admin/biaya",
    icon: <AttachMoneyOutlinedIcon color="primary" />,
  },
  {
    label: "Pengumuman",
    link: "/admin/pengumuman",
    icon: <CampaignOutlinedIcon color="primary" />,
  },
  {
    label: "Narahubung",
    link: "/admin/narahubung",
    icon: <WhatsAppIcon color="primary" />,
  },
];

const data2 = [
  {
    label: "Calon Pelajar",
    link: "/admin/pelajar",
    icon: <PeopleOutlinedIcon color="primary" />,
  },
  {
    label: "Diterima",
    link: "/admin/pelajar/diterima",
    icon: <PermContactCalendarOutlinedIcon color="success" />,
  },
  {
    label: "Ditolak",
    link: "/admin/pelajar/ditolak",
    icon: <PersonOffOutlinedIcon color="error" />,
  },
];

const data3 = [
  {
    label: "Pembayaran",
    link: "/admin/pembayaran",
    icon: <AccountBalanceOutlinedIcon color="primary" />,
  },
  {
    label: "Statistik",
    link: "/admin/statistik",
    icon: <DonutLargeOutlinedIcon color="primary" />,
  },
];

const ListMenu = () => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  return (
    <List
      sx={{ bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton component={Link} to="/admin">
        <ListItemIcon>
          <HomeOutlinedIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Beranda" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <FolderOutlinedIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Data Pokok" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data1.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 4 }}
              component={Link}
              to={item.link}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick2}>
        <ListItemIcon>
          <FolderSharedOutlinedIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Pendaftar" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data2.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 4 }}
              component={Link}
              to={item.link}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick3}>
        <ListItemIcon>
          <AssessmentIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Laporan" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data3.map((item) => (
            <ListItemButton
              key={item.label}
              sx={{ pl: 4 }}
              component={Link}
              to={item.link}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <ListItemButton component={Link} to="/admin/pesan">
        <ListItemIcon>
          <ForumIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="Pesan" />
      </ListItemButton>
    </List>
  );
};

export default ListMenu;
