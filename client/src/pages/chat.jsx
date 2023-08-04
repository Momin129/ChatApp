import { Box, Button, Fade, Grid, Slide } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contacts from "../components/chat/contacts";
import MessageBox from "../components/chat/messageBox";

const userId = sessionStorage.getItem("userId");

function Chat() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const [chat, setChat] = useState(-1);

  const showChat = () => {
    console.log(chat);
    if (chat == -1) {
      setChat(1);
      setChecked(true);
    } else {
      setChat(-1);
      setChecked(false);
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
        setUsername(user.data.username);
        setAvatar(user.data.avatarImage);
      })();
    }
  }, []);

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
        {username}
        <Box
          component={"img"}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(avatar)}`}
          sx={{ width: 30, marginLeft: 1 }}
        ></Box>
      </Box>
      <Box
        sx={{
          height: "70%",
          backgroundColor: "#1D267D",
          borderRadius: 5,
          boxShadow: 5,
          width: { xs: 390, md: "60%" },
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
            <Contacts showChat={showChat} />
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            sx={{
              display: { xs: "none", md: "block" },
              padding: 3,
              width: 1,
            }}
          >
            <MessageBox />
          </Grid>
          <Slide
            direction="up"
            in={checked}
            style={{ transitionDelay: checked ? "500ms" : "0ms" }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: { xs: "block", md: "none" },
                position: "absolute",
                zIndex: chat,
                height: "70%",
                width: "95%",
                backgroundColor: "#1D267D",
                borderRadius: 7,
                padding: 1,
              }}
            >
              <Button variant="contained" onClick={showChat}>
                Close
              </Button>
              <MessageBox />
            </Grid>
          </Slide>
        </Grid>
      </Box>
    </Box>
  );
}

export default Chat;
