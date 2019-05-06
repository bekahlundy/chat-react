const express = require("express");
const socket = require("socket.io");
const http = require("http");
const bodyParser = require("body-parser");
const { routes } = require("./routes");
const store = require("./store.js");

const app = express();
const appServer = http.createServer(app);

app.use(bodyParser.json());
app.use(routes());

server = app.listen(8080, () => {
  console.log("server is running on port 8080");
});

io = socket(server);

io.on("connection", socket => {
  socket.on("SEND_MESSAGE", msgObj => {
    io.emit("RECEIVE_MESSAGE", msgObj);
  });

  socket.on("ADD_NEW_USER", userObj => {
    io.emit("NEW_USER_JOINED", userObj);
  });

  socket.on("DROP_USER", userObj => {
    let userName = userObj.user;
    let updatedStore = store.dropUser(userName);
    io.emit("USER_DROPPED", updatedStore);
  });
});
