/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import InputFiled from "./inputFiled";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function MessageBox({ chat, user, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  useEffect(() => {
    if (chat) {
      (async function () {
        const response = await axios.get(
          "http://localhost:4242/api/getallmessage",
          {
            params: {
              from: user.id,
              to: chat.id,
            },
          }
        );
        setMessages(response.data);
      })();
    }
  }, [chat, user.id]);

  useEffect(() => {
    console.log(socket.current);
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg);
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (scrollRef.current?.lastElementChild)
      scrollRef.current?.lastElementChild.scrollIntoView({
        behaviour: "smooth",
      });
  }, [messages]);

  const handleMessages = async (msg) => {
    await axios.post("http://localhost:4242/api/addmessage", {
      from: user.id,
      to: chat.id,
      message: msg,
    });
    socket.current.emit("send-msg", {
      to: chat.id,
      from: user.id,
      message: msg,
    });
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  return (
    <>
      {chat ? (
        <Box
          sx={{
            height: { xs: "70%", md: "90%" },
            backgroundColor: "#0C134F",
            padding: 3,
            borderRadius: 3,
            display: "flex",
            flexDirection: "column",
            overflowY: "hidden",
          }}
        >
          <Box
            sx={{
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              borderBottom: 2,
              borderBottomColor: "#1D267D",
              padding: 1,
            }}
          >
            {chat.username}
            <Box
              component={"img"}
              src={`data:image/svg+xml;utf8,${encodeURIComponent(
                chat.avatarImage
              )}`}
              sx={{ width: 30, marginLeft: 1 }}
            ></Box>
          </Box>

          <Box
            ref={scrollRef}
            sx={{
              marginTop: 2,
              height: "80%",
              overflowY: "auto",
              scrollbarWidth: "thin",
              padding: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((message, index) => {
              return (
                <Box key={index} sx={{ marginTop: 1 }}>
                  <Typography
                    sx={{
                      backgroundColor: message.fromSelf ? "#1D267D" : "black",
                      padding: 2,
                      borderRadius: 3,
                      width: "40%",
                      wordWrap: "break-word",
                      float: message.fromSelf ? "right" : "left",
                    }}
                  >
                    {message.message}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          <InputFiled handleMessages={handleMessages} />
        </Box>
      ) : (
        <Box
          sx={{
            height: { xs: "70%", md: "90%" },
            backgroundColor: "#0C134F",
            padding: 3,
            borderRadius: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h1">Welcome</Typography>
          <Typography variant="h4">Select a user to chat.</Typography>
        </Box>
      )}
    </>
  );
}
