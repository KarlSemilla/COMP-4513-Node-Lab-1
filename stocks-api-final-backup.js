const path = require("path");
const parser = require("body-parser");
const express = require("express");

const app = express();

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

const provider = require("./scripts/data-provider.js");
provider.retrieveCompanies(app);

app.use("/static", express.static(path.join(__dirname, "public")));
app.use(
  "/socket.io",
  express.static(path.join(__dirname, "/node_modules/socket.io-client/dist/"))
);

// listen for socket communication on port 3000
const server = require("socket.io");
const io = new server(3000);

io.on("connection", socket => {
  console.log("new connection made with client");
  // client has sent a new user has joined message
  socket.on("username", msg => {
    console.log("username: " + msg);
    // attach passed username with this communication socket
    socket.username = msg;
    // broadcast message to all connected clients
    const obj = { message: "Has joined", user: msg };
    io.emit("user joined", obj);
  });
  // client has sent a chat message ... broadcast it
  socket.on("chat from client", msg => {
    socket.broadcast.emit("chat from server", {
      user: socket.username,
      message: msg
    });
  });
});

let port = 8080;
app.listen(port, () => {
  console.log("Server running at port= " + port);
});
