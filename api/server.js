const express = require("express");
const usersRouter = require("../users/users-router");
const authRouter = require("../auth/auth-router");

const server = express();
server.use(express.json());
server.use("/api", usersRouter);
server.use("/api/auth", authRouter);
server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: "Something went wrong...",
  });
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to API" });
});

module.exports = server;
