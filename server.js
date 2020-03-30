const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");
require("./db/db");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use("/api/chat", require("./routes/chat"));
app.use("/api/auth", require("./routes/auth"));

try {
  io.on("connect", socket => {
    socket.on("new-user", data => {
      // Initial Connection
      console.log(`${data} connected`);

      socket.emit("chat-message", {
        user: "Admin",
        message: "Welcome to babble!",
        time: new Date().toLocaleTimeString()
      });

      socket.broadcast.emit("chat-message", {
        user: "Admin",
        message: `${data} joined the chat!`,
        time: new Date().toLocaleTimeString()
      });
    });

    socket.on("send-message", data => {
      // Subsequent Chats
      console.log(`${data.user} says ${data.message}`);
      socket.broadcast.emit("chat-message", data);
    });

    socket.on("typing", data => {
      // Typing
      socket.broadcast.emit("typing", data);
    });
  });

  server.listen(PORT, () => console.log("The Server is running on ", PORT));
} catch (error) {
  console.log(error);
}
