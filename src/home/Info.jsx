import HowToRegIcon from "@mui/icons-material/HowToReg";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import FingerprintOutlinedIcon from "@mui/icons-material/FingerprintOutlined";
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import { deepPurple } from "@mui/material/colors";

import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment } from "react";

const data = [
  { label: "Buat Akun", icon: <HowToRegIcon /> },
  { label: "Lakukan Pembayaran", icon: <AssuredWorkloadIcon /> },
  { label: "Isi Formulir Pendaftaran", icon: <TextSnippetIcon /> },
  { label: "Upload Berkas", icon: <DriveFolderUploadIcon /> },
];

const data2 = [
  { label: "Ijazah / SKL", icon: <DocumentScannerOutlinedIcon /> },
  { label: "Akta Lahir", icon: <DocumentScannerOutlinedIcon /> },
  { label: "Kartu Keluarga", icon: <DocumentScannerOutlinedIcon /> },
  { label: "KTP Orang Tua", icon: <FingerprintOutlinedIcon /> },
  { label: "NISN", icon: <FingerprintOutlinedIcon /> },
  { label: "Foto 3x4", icon: <InsertPhotoOutlinedIcon /> },
];

const Info = () => {
  return (
    <Fragment>
      <Typography>Alur Pendaftaran</Typography>
      <List>
        {data.map((item, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: deepPurple[500] }}>{item.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Fragment>
  );
};

export default Info;
