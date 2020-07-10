const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to API" });
});

module.exports = server;
