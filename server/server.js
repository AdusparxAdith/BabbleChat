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
  console.log("A user connected on", socket);
});

server.listen(PORT, () => console.log("The Server is running on ", PORT));
