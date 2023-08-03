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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../utils/formValidation";
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
  "& .MuiFormHelperText-root": {
    whiteSpace: "pre-line",
    backgroundColor: "black",
    paddingX: 2,
    borderLeft: 2,
    borderLeftColor: "red",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "white",
  },
};

function Register() {
  const navigate = useNavigate();
  const [valid, setValid] = useState(true);
  const [inputs, setInputs] = useState([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (inputs && inputs.password === inputs.confirmPassword) {
      let valid = false;
      for (let item in error) {
        if (error[item].length != 0 || !inputs[item]) valid = true;
      }
      setValid(valid);
    } else setValid(true);
  }, [inputs, error]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleBlur = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    let returnMsg = await validateForm(name, value);
    if (name == "confirmPassword" && returnMsg == "") {
      if (value != inputs.password) returnMsg = "*Password does not match";
    }
    setError((values) => ({ ...values, [name]: returnMsg }));
  };

  const handleSubmit = async () => {
    console.log("INSIDE");
    let obj = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
    };
    let url = "http://localhost:4242/api/register";

    axios
      .post(url, obj)
      .then((result) => {
        console.log(result);
        for (let item in inputs)
          setInputs((values) => ({ ...values, [item]: "" }));
        setValid(false);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
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
              error={error.username}
              helperText={error.username}
              name="username"
              type="text"
              label="Username"
              value={inputs.username || ""}
              sx={inputProps}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error.email}
              helperText={error.email}
              name="email"
              type="email"
              label="Email"
              value={inputs.email || ""}
              sx={inputProps}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error.password}
              helperText={error.password}
              name="password"
              type="password"
              label="Password"
              value={inputs.password || ""}
              sx={inputProps}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={error.confirmPassword}
              helperText={error.confirmPassword}
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={inputs.confirmPassword || ""}
              sx={inputProps}
              onChange={handleChange}
              onBlur={handleBlur}
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
              disabled={valid}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {"ALREADY HAVE AN ACCOUTN ?"}
              <Link
                sx={{ fontWeight: "bold", cursor: "pointer", marginLeft: 1 }}
                onClick={() => navigate("/login")}
              >
                LOGIN
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        autoHideDuration={8000}
        open={open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Registration Successfull.
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Register;
