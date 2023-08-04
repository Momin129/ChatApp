/* eslint-disable react/prop-types */
import { Box } from "@mui/material";

export default function Contacts(props) {
  const rows = [];
  for (let i = 0; i < 40; i++) {
    rows.push(i);
  }

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
              }}
              onClick={() => {
                props.showChat();
              }}
            >
              testUser{value}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
