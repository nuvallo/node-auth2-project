const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.json({ message: "welcome to api" });
});

module.exports = server;
