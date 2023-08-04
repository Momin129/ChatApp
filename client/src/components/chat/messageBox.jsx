import { Box, Typography } from "@mui/material";

export default function MessageBox() {
  return (
    <Box
      sx={{
        height: { xs: "70%", md: "90%" },
        backgroundColor: "#0C134F",
        padding: 3,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          backgroundColor: "black",
          borderRadius: 3,
          padding: 2,
          fontWeight: "bold",
        }}
      >
        testuser1
      </Box>
      <Box sx={{ marginTop: 2 }}>
        <Typography
          sx={{
            backgroundColor: "burlywood",
            padding: 2,
            borderRadius: 3,
            width: "40%",
            wordWrap: "break-word",
            float: "right",
          }}
        >
          This is message is to test the design of messages.
        </Typography>
      </Box>
    </Box>
  );
}
