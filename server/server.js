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

io.on("connect", socket => {
  socket.emit("chat-message", "Welcome to babble!");

  socket.on("new-user", data => {
    console.log(`${data} connected`);
    socket.broadcast.emit("chat-message", `${data} joined the chat!`);
  });

  socket.on("send-message", data => {
    socket.broadcast.emit("chat-message", data);
  });
});

server.listen(PORT, () => console.log("The Server is running on ", PORT));
