/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

export default function Contacts(props) {
  const rows = props.chats;

  return (
    <Box sx={{ height: 1 }}>
      <Box
        sx={{
          position: "relative",
          marginTop: 3,
          overflowY: "scroll",
          height: "90%",
          scrollbarWidth: "thin",
          scrollbarColor: "#0C134F #1D267D",
          padding: 1,
        }}
      >
        {rows.map((value, index) => {
          return (
            <Box
              key={index}
              sx={{
                backgroundColor: "#0C134F",
                marginBottom: 1,
                padding: 2,
                borderRadius: 3,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                props.setCurrentChat(value);
                props.showChat();
              }}
            >
              {value.username}
              <Box
                component={"img"}
                src={`data:image/svg+xml;utf8,${encodeURIComponent(
                  value.avatarImage
                )}`}
                sx={{ width: 30, marginLeft: 1 }}
              ></Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
