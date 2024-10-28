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
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Link } from "react-router-dom";
import { useGetFormsQuery } from "../../../api/service/formApi";
import { Badge } from "@mui/material";
import { useGetPaymentsQuery } from "../../../api/service/paymentApi";

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
    label: "Berita",
    link: "/admin/pengumuman",
    icon: <CampaignOutlinedIcon color="primary" />,
  },
  {
    label: "Jadwal",
    link: "/admin/jadwal",
    icon: <EventNoteIcon color="primary" />,
  },
  {
    label: "Narahubung",
    link: "/admin/narahubung",
    icon: <WhatsAppIcon color="primary" />,
  },
  {
    label: "Kuisioner",
    link: "/admin/kuisioner",
    icon: <ArticleOutlinedIcon color="primary" />,
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
  const { data, refetch } = useGetFormsQuery();
  const { data: payment, refetch: paymentRefetch } = useGetPaymentsQuery();

  const count = data?.filter(
    (d) => d.status_pendaftaran === "Diproses"
  )?.length;
  const newPayment = payment?.filter((p) => p.status === "Diproses")?.length;

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

  React.useEffect(() => {
    const interval = setInterval(() => {
      refetch();
      paymentRefetch();
    }, 120000);

    return () => clearInterval(interval);
  }, []);

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
          <Badge badgeContent={count} color="error">
            <FolderSharedOutlinedIcon color="primary" />
          </Badge>
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
              <ListItemIcon>
                <Badge
                  badgeContent={item.label === "Calon Pelajar" ? count : 0}
                  color="error"
                >
                  {item.icon}
                </Badge>
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick3}>
        <ListItemIcon>
          <Badge badgeContent={newPayment} color="error">
            <AssessmentIcon color="primary" />
          </Badge>
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
              <ListItemIcon>
                <Badge
                  badgeContent={item.label === "Pembayaran" ? newPayment : 0}
                  color="error"
                >
                  {item.icon}
                </Badge>
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </List>
  );
};

export default ListMenu;
