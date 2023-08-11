import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import { useNavigate } from "react-router-dom";
import { host } from "../utils/host";

export default function SetAvatar() {
  const navigate = useNavigate();
  const [avatar, SetAvatar] = useState([]);
  const [length, setLength] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    (async function () {
      for (let i = 0; i < 4; i++) {
        const Avatar = await axios.get(
          `https://api.multiavatar.com/${Math.round(
            Math.random() * 1000
          )}?apikey=MZQ1ziv3CThtPd`
        );
        SetAvatar((arr) => [...arr, Avatar]);
        setLength((prevValue) => prevValue + 1);
      }
    })();
  }, []);

  const SetUserAvatar = async () => {
    const userId = sessionStorage.getItem("userId");
    const profile = avatar[selectedIndex].data;
    try {
      const setImage = await axios.post(`${host}/api/setAvatar`, {
        id: userId,
        avatarImage: profile,
      });
      localStorage.setItem("token", setImage.data.token);
      navigate("/chat");
      console.log(setImage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          height: 1,
          backgroundColor: "#0C134F",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial",
          paddingX: { xs: 1, md: 0 },
        }}
      >
        {length === 4 ? (
          <Box
            sx={{
              justifyContent: "center",
            }}
          >
            <Typography variant="h3">Set an avatar for your profile</Typography>
            <Grid
              container
              sx={{
                marginTop: 3,
                backgroundColor: "#1D267D",
                borderRadius: 5,
                paddingY: 2,
              }}
            >
              {avatar.map((data, index) => {
                return (
                  <Avatar
                    key={index}
                    data={data}
                    index={index}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                  />
                );
              })}
            </Grid>
            <Button
              variant="contained"
              sx={{
                fontWeight: "bold",
                backgroundColor: "#5C469C",
                borderRadius: 7,
                marginTop: 5,
                width: 1,
                "&:hover": { backgroundColor: "#674fb0" },
              }}
              onClick={SetUserAvatar}
            >
              Select Avatar
            </Button>
          </Box>
        ) : (
          <Box
            component={"img"}
            src="/images/loder.gif"
            alt="loader"
            sx={{ width: 200 }}
          ></Box>
        )}
      </Box>
    </>
  );
}
