const express = require("express");
const helmet = require("helmet");

const usersRouter = require("../users/users-router.js");
const authRouter = require("../auth/auth-router.js");
const authenticator = require("../auth/authenticator.js");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/users", authenticator, usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "Clear to engage." });
});

module.exports = server;
