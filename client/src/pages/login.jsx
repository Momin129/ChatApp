import {
  Alert,
  Box,
  Button,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const inputProps = {
  input: { color: "white" },
  label: { color: "white" },
  width: 1,
  "& .MuiOutlinedInput-root": {
    border: 2,
    borderColor: "#5C469C",
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: "white",
  },
  "& fieldset": {
    border: "none",
  },
};

function Login() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState([]);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async () => {
    if (
      inputs.length == 0 ||
      inputs.username.length == 0 ||
      inputs.password.length == 0
    ) {
      setMsg("Username and password required.");
      setOpen(true);
    } else {
      let obj = {
        username: inputs.username,
        password: inputs.password,
      };
      let url = "https://chatapp-s6l0.onrender.com/api/login";

      axios
        .post(url, obj)
        .then((result) => {
          localStorage.setItem("token", result.data.token);
          sessionStorage.setItem("userId", result.data.id);
          if (result.data.avatarImage === "") navigate("/setAvatar");
          else navigate("/chat");
        })
        .catch((err) => {
          setMsg(err.response.data.message);
          setOpen(true);
        });
    }
  };

  return (
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
      <Box
        sx={{
          backgroundColor: "#1D267D",
          paddingY: 5,
          paddingX: { xs: 3, md: 8 },
          borderRadius: 5,
          boxShadow: 5,
          width: { xs: 390, md: 400 },
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box component={"img"} src="/images/logo.png" sx={{ width: 100 }} />
            <Typography
              sx={{ textAlign: "center", fontSize: 36, fontWeight: "bold" }}
            >
              Chat App
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="username"
              type="text"
              label="Username"
              value={inputs.username || ""}
              sx={inputProps}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              type="password"
              label="Password"
              value={inputs.password || ""}
              sx={inputProps}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                width: 1,
                fontWeight: "bold",
                backgroundColor: "#5C469C",
                "&:hover": { backgroundColor: "#674fb0" },
                "&:disabled": { backgroundColor: "grey", color: "white" },
              }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {"DON'T HAVE AN ACCOUTN ?"}
              <Link
                sx={{ fontWeight: "bold", cursor: "pointer", marginLeft: 1 }}
                onClick={() => navigate("/")}
              >
                REGISTER
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        autoHideDuration={5000}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
