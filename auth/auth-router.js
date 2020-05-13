const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model.js");
const secrets = require("../api/secrets.js");

function generateToken(user) {
  const payload = {
    userId: user.id,

    username: user.username,
  };

  const secret = secrets.jwtSecret;

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

router.post("/register", async (req, res) => {
  try {
    let userData = req.body;
    const user = await Users.add(userData);
    const rounds = process.env.HASH_ROUNDS || 8;

    const hash = bcrypt.hashSync(user.password, rounds);
    user.password = hash;

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;

    const user = await Users.findBy({ username }).first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      res.status(200).json({ message: "Successfully logged in!", token });
    } else {
      res.status(401).json({ message: "Incorrect password." });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: err.message });
  }
});

module.exports = router;
