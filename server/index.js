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

global.onlineUser = [];

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUser.push({ userId: userId, socketId: socket.id });
    io.emit("get-users", onlineUser);
    console.log(onlineUser);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUser.filter((item) => {
      if (item.userId === data.to) return item;
    });
    console.log("send", sendUserSocket);
    if (sendUserSocket)
      socket.to(sendUserSocket[0].socketId).emit("msg-recieve", data.message);
  });
});
