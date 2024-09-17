import React, { useEffect, useRef, useState } from "react";
import Layout from "../components/layout/Layout";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  Grid2,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useGetUsersQuery } from "../../api/service/userApi";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useGetChatsHistoryQuery } from "../../api/service/chatApi";

// Socket connection setup
const socket = io(import.meta.env.VITE_API, { withCredentials: true });
const chatSound = new Audio("/chat_sound.mp3");

const ChatPage = () => {
  const { user: admin } = useSelector((state) => state.user);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState("");
  const [unreadChat, setUnreadChat] = useState({});
  const chatEndRef = useRef(null);

  const { data: users } = useGetUsersQuery();
  const { data: chatsHistory } = useGetChatsHistoryQuery(selectedUser?.id, {
    skip: !selectedUser?.id,
  });

  const sendMessage = (e) => {
    e.preventDefault();
    if (!chat) return;

    const chatMessage = {
      sender_id: admin?.id,
      sender: admin?.name,
      sender_role: "admin",
      recipient_id: selectedUser?.id,
      recipient: selectedUser?.name,
      recipient_role: selectedUser?.role,
      chat,
    };

    socket.emit("message", chatMessage);
    setChat("");
  };

  const getUnreadCount = (name) => {
    return unreadChat[name] || 0;
  };

  // Reset unread count for the selected user
  useEffect(() => {
    if (selectedUser) {
      setChats(chatsHistory || []);
      setUnreadChat((prevUnread) => ({
        ...prevUnread,
        [selectedUser.name]: 0, // Reset unread count for the selected user
      }));
    }
  }, [selectedUser, chatsHistory]);

  // Listen to incoming messages from socket
  useEffect(() => {
    socket.on("message", (data) => {
      const msg = data.rows[0];

      // Check if the message is relevant to the current admin and selected user
      if (
        (msg.penerima_role === "admin" || msg.pengirim_role === "admin") &&
        (msg.penerima_id === selectedUser?.id ||
          msg.pengirim_id === selectedUser?.id)
      ) {
        setChats((prevChats) => [...prevChats, msg]); // Add new message to chat
      } else {
        // Increment unread count for other users
        setUnreadChat((prevUnread) => ({
          ...prevUnread,
          [msg.pengirim]: (prevUnread[msg.pengirim] || 0) + 1,
        }));

        chatSound.play();
      }
    });
  }, [selectedUser]);

  // Auto scroll to the latest message
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  console.log(unreadChat);

  return (
    <Layout>
      <Grid2 container>
        <Grid2 item size={3}>
          <Paper
            sx={{
              m: 1,
              p: 1,
              height: { md: 550, lg: 580, xl: 660 },
              overflow: "auto",
            }}
          >
            <ButtonGroup fullWidth>
              <Button startIcon={<ChatOutlinedIcon />}>Pesan</Button>
              <Button startIcon={<GroupsOutlinedIcon />}>User</Button>
            </ButtonGroup>
            <List>
              {users?.map((user) => {
                const photo = user.berkas?.find((item) => item["Foto"])?.Foto;
                return (
                  <ListItemButton
                    key={user?.id}
                    onClick={() => setSelectedUser(user)}
                  >
                    <ListItemAvatar>
                      <Badge
                        color="error"
                        badgeContent={getUnreadCount(user.name)}
                        max={10}
                      >
                        <Avatar src={photo} />
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user?.name}
                      secondary={user?.email}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Paper>
        </Grid2>
        <Grid2 item size={9}>
          <Paper
            sx={{
              p: 1,
              m: 1,
              height: { md: 500, lg: 580, xl: 660 },
            }}
          >
            <Box sx={{ height: "93%", overflow: "auto" }}>
              {selectedUser ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    height: { md: 500, lg: 520, xl: 600 },
                  }}
                >
                  {chats?.map((chat, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 1,
                        bgcolor:
                          chat.pengirim_role === "user" ? "#6069B6" : "#258032",
                        color: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        width: "40%",
                        alignSelf:
                          chat.pengirim_role === "user"
                            ? "flex-end"
                            : "flex-start",
                      }}
                    >
                      <Typography
                        align={chat.pengirim_role === "user" ? "right" : "left"}
                        fontWeight="bold"
                      >
                        {chat.pengirim}
                      </Typography>
                      <Typography
                        align={chat.pengirim_role === "user" ? "right" : "left"}
                      >
                        {chat.teks}
                      </Typography>
                      <Typography
                        fontSize={10}
                        align={chat.pengirim_role === "user" ? "right" : "left"}
                      >
                        {new Date(chat.created_at).toLocaleString("id-ID")}
                      </Typography>
                    </Paper>
                  ))}
                  <div ref={chatEndRef} />
                </Box>
              ) : (
                <Typography>Pilih user untuk memulai pesan</Typography>
              )}
            </Box>

            <form
              onSubmit={sendMessage}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="Ketik pesan"
                value={chat}
                onChange={(e) => setChat(e.target.value)}
                fullWidth
                size="small"
                variant="standard"
              />

              <IconButton color="primary">
                <AttachFileIcon />
              </IconButton>

              <IconButton type="submit" color="success">
                <SendIcon />
              </IconButton>
            </form>
          </Paper>
        </Grid2>
      </Grid2>
    </Layout>
  );
};

export default ChatPage;
