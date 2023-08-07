import { Box, Fade, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contacts from "../components/chat/contacts";
import MessageBox from "../components/chat/messageBox";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { io } from "socket.io-client";
import { useRef } from "react";

function Chat() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const [user, setUser] = useState({});
  const [chatBox, setChatBox] = useState(-1);
  const [currentChat, setCurrentChat] = useState(null);
  const [contacts, setContacts] = useState([]);
  const socket = useRef();
  const showChat = () => {
    if (chatBox == -1) {
      setChatBox(1);
    } else {
      setChatBox(-1);
    }
  };

  useEffect(() => {
    if (userId === undefined) navigate("/login");
    else {
      (async function () {
        const user = await axios.get(
          "http://localhost:4242/api/getuserdetails",
          { params: { id: userId } }
        );
        setUser(user.data);
        const chats = await axios.get("http://localhost:4242/api/getChats", {
          params: { id: userId },
        });
        setContacts(chats.data.filter);
      })();
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:4242");
      socket.current.emit("add-user", userId);
    }
  }, [user]);
  return (
    <Box
      sx={{
        height: 1,
        backgroundColor: "#0C134F",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "Arial",
        paddingX: { xs: 1, md: 0 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#1D267D",
          borderRadius: 7,
          width: "max-content",
          padding: 2,
          margin: "0 auto",
        }}
      >
        {user.username}
        <Box
          component={"img"}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(
            user.avatarImage
          )}`}
          sx={{ width: 30, marginLeft: 1 }}
        ></Box>
        <PowerSettingsNewIcon
          sx={{ marginLeft: 5, cursor: "pointer" }}
          onClick={() => {
            localStorage.removeItem("token");
            sessionStorage.removeItem("userId");
            navigate("/");
          }}
        />
      </Box>
      <Box
        sx={{
          height: "70%",
          backgroundColor: "#1D267D",
          borderRadius: 5,
          boxShadow: 5,
          width: { xs: "95%", lg: "60%" },
          marginTop: 1,
        }}
      >
        <Grid container sx={{ height: 1 }}>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              height: 1,
              borderRight: 2,
              borderRightColor: "#0C134F",
              padding: 3,
            }}
          >
            <Contacts
              showChat={showChat}
              chats={contacts}
              setCurrentChat={setCurrentChat}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: { xs: "none", md: "block" },
              padding: 3,
              width: 1,
              height: 1,
            }}
          >
            <MessageBox chat={currentChat} user={user} socket={socket} />
          </Grid>
          <Fade
            in={chatBox == 1}
            style={{
              transitionDelay: chatBox == 1 ? "500ms" : "0ms",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: { xs: "block", md: "none" },
                position: "absolute",
                zIndex: chatBox,
                height: "70%",
                width: "90%",
                backgroundColor: "#1D267D",
                borderRadius: 7,
                padding: 1,
              }}
            >
              <KeyboardBackspaceIcon onClick={showChat} />
              <MessageBox chat={currentChat} user={user} socket={socket} />
            </Grid>
          </Fade>
        </Grid>
      </Box>
    </Box>
  );
}

export default Chat;
