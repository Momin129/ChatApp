const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", require("./routes/userRoutes"));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
