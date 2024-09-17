import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";

const Attachment = ({ data }) => {
  const files = data.berkas;
  const notes = data.kesehatan;
  const families = data.keluarga;
  return (
    <>
      <Paper sx={{ p: 1 }}>
        <Typography fontWeight="bold">Berkas</Typography>
        <Table>
          <TableBody>
            {[
              { label: "Kartu Keluarga", name: "KK" },
              { label: "Akta Kelahiran", name: "Akta" },
              { label: "KTP Ayah", name: "Ayah" },
              { label: "KTP Ibu", name: "Ibu" },
              { label: "Ijazah / SKL", name: "IJSKL" },
              { label: "Foto", name: "Foto" },
              { label: "Rapot", name: "Rapot" },
            ].map((field) => {
              const file = files?.find((f) => f[field.name]);

              return (
                <TableRow key={field.name}>
                  <TableCell sx={{ width: 200 }}> {field.label}</TableCell>
                  <TableCell align="center" sx={{ width: 20 }}>
                    :
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      href={file[field.name]} // Use the correct file link here
                      target="_blank" // Open in a new tab
                      rel="noopener noreferrer"
                    >
                      Link
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ my: 1, p: 1 }}>
        <Typography fontWeight="bold">Keluarga</Typography>
        <Table>
          <TableHead>
            <TableRow>
              {["No", "Nama", "Lahir", "Usia"].map((item) => (
                <TableCell key={item} align="center">
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {families?.map((item, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell>{item.nama}</TableCell>
                <TableCell align="center">{item.tanggal_lahir}</TableCell>
                <TableCell align="center">-</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ p: 1 }}>
        <Typography fontWeight="bold">Catatan Kesehatan</Typography>
        <Table>
          <TableHead>
            <TableRow>
              {["No", "Catatan"].map((item) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default Attachment;
