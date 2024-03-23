const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const path = require("path");

const app = express();
const server = http.createServer(app);

const assetsDirectory = path.join(__dirname, "assets");

// Serve static files from the assets directory
app.use("/assets", express.static(assetsDirectory));

const io = socketIo(server);

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", message);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port http://localhost:3000");
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
