import React from "react";
import Layout from "../components/layout/Layout";
import {
  Grid2,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Announcements from "../components/announce/Announcements";
import { useGetPostsQuery } from "../api/service/postApi";
import { useGetContactsQuery } from "../api/service/contactApi";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

const UserPage = () => {
  const { data } = useGetPostsQuery();
  const { data: contacts } = useGetContactsQuery();

  const posts = data?.filter((d) => d.kategori === "persyaratan");

  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={{ xs: 12, md: 8 }} sx={{ p: 1 }}>
          <Announcements data={posts} />
        </Grid2>
        <Grid2 item size={{ xs: 12, md: 4 }} sx={{ p: 1 }}>
          <Paper>
            <List>
              <ListSubheader>Narahubung</ListSubheader>
              {contacts?.map((item) => (
                <ListItem key={item.id}>
                  <ListItemButton
                    onClick={() =>
                      window.open(`https://wa.me/${item.tlp}`, "_blank")
                    }
                  >
                    <ListItemAvatar>
                      <WhatsAppIcon color="success" />
                    </ListItemAvatar>
                    <ListItemText primary={item.nama} secondary={item.tlp} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default UserPage;
