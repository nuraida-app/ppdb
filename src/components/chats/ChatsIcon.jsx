import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Box,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useSelector } from "react-redux";
import { useGetChatsHistoryQuery } from "../../api/service/chatApi";
import { useGetAdminQuery } from "../../api/service/userApi";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const socket = io(import.meta.env.VITE_API, { withCredentials: true });
const chatSound = new Audio("/chat_sound.mp3");

const ChatsIcon = () => {
  const { user } = useSelector((state) => state.user);
  const { data: chatsHistory } = useGetChatsHistoryQuery(user?.id, {
    skip: !user?.id,
  });
  const { data: admin } = useGetAdminQuery();

  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState("");
  const [chats, setChats] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const chatEndRef = useRef(null);

  const openChat = () => {
    if (!user) return toast.error("Login terlebih dahulu");
    setOpen(!open);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!chat) return;

    const chatMessage = {
      sender_id: user?.id,
      sender: user?.name,
      sender_role: user?.role,
      recipient_id: admin?.id,
      recipient: admin?.name,
      recipient_role: admin?.role,
      chat,
    };

    socket.emit("message", chatMessage);
    setChat("");
  };

  useEffect(() => {
    if (chatsHistory) {
      setChats(chatsHistory);
    }
  }, [chatsHistory]);

  useEffect(() => {
    socket.on("message", (data) => {
      const msg = data.rows[0];

      console.log(msg);

      if (
        (msg.penerima_id === user?.id || msg.pengirim_id === user?.id) &&
        (msg.penerima_role === "user" || msg.pengirim_role === "user")
      ) {
        setChats((prevChats) => [...prevChats, msg]);
      }

      if (msg.pengirim_role === "admin" && !open) {
        setUnreadCount((prevCount) => prevCount + 1);

        chatSound.play();
      }
    });
  }, [user?.id]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);

  return (
    <>
      <IconButton
        sx={{
          position: "fixed",
          bottom: { xs: 10, md: 20 },
          right: { xs: 10, md: 20 },
        }}
        color="success"
        onClick={openChat}
      >
        <Badge badgeContent={unreadCount} color="error">
          <ForumIcon />
        </Badge>
      </IconButton>

      <Paper
        sx={{
          position: "fixed",
          height: { xs: 500, md: 550 },
          width: 350,
          bottom: open ? 70 : -550,
          right: 10,
          p: 1,
          transition: "bottom 0.5s ease",
        }}
      >
        <Typography fontWeight="bold">Admin</Typography>

        <Box
          sx={{
            height: "85%",
            my: 1,
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {chats?.map((chat, index) => (
            <Paper
              key={index}
              sx={{
                p: 1,
                bgcolor: chat.pengirim_role === "user" ? "#6069B6" : "#258032",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                width: "80%",
                alignSelf:
                  chat.pengirim_role === "user" ? "flex-start" : "flex-end",
              }}
            >
              <Typography
                align={chat.pengirim_role === "user" ? "left" : "right"}
                fontWeight="bold"
              >
                {chat.pengirim}
              </Typography>
              <Typography
                align={chat.pengirim_role === "user" ? "left" : "right"}
                sx={{ display: "flex", flexWrap: "wrap" }}
              >
                {chat.teks}
              </Typography>
              <Typography
                fontSize={10}
                align={chat.pengirim_role === "user" ? "left" : "right"}
              >
                {new Date(chat.created_at).toLocaleString("id-ID")}
              </Typography>
            </Paper>
          ))}
          <div ref={chatEndRef} />
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
    </>
  );
};

export default ChatsIcon;
