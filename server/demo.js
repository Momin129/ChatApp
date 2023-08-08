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

global.onlineUsers = [];

io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({ userId: userId, socketId: socket.id });
      console.log("Online Users", onlineUsers);
    }
    io.emit("get-users", onlineUsers);
  });

  socket.on("send-msg", (data) => {
    console.log("chat id", data.to, "onlineUsers", onlineUsers);
    const sendUserSocket = onlineUsers.filter((item) => {
      if (item.userId == data.to) return item;
    });
    if (sendUserSocket) {
      console.log("sendUserScoket", sendUserSocket, sendUserSocket[0].socketId);
      socket.to(sendUserSocket[0].socketId).emit("msg-recieve", data.message);
    }
  });
});
