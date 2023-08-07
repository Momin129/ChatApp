const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const socket = require("socket.io");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/messageRoutes"));

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUser = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUser.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUser.get(data.to);
    if (sendUserSocket)
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
  });
});
