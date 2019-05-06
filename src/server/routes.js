const express = require("express");
const store = require("./store.js");

const routes = () => {
  const router = express.Router();

  router.get("/messages", (req, res) => {
    let messages = store.getCurrentMessages();
    res.json(messages);
  });

  router.get("/users", (req, res) => {
    let users = store.getCurrentUsers();
    res.json(users);
  });

  router.post("/add-new-message", (req, res) => {
    let author = req.body.author;
    let newMessage = req.body.message;
    let message = store.addNewMessage(author, newMessage);

    res.status(201);
    res.json(message);
  });

  router.post("/add-new-user", (req, res) => {
    let userName = req.body.user;
    let user = store.addNewUser(userName);

    res.status(201);
    res.json(user);
  });

  return router;
};

module.exports = { routes };
