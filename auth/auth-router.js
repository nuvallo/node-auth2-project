const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model");

// Register a new user
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, department } = req.body;

    if (username) {
      return res.status(501).json({ message: "Username already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 14);

    const newUser = await Users.add({
      username,
      password: hashedPassword,
      department,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// Login a existing user
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }).first();

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(501).json({
        message: "Invalid Credentials",
      });
    }
    const payload = {
      userId: user.id,
      username: user.username,
      userRole: user.department,
    };

    res.cookie("token", jwt.sign(payload, process.env.JWT_SECRET));

    console.log(payload.userRole);
    res.json({
      message: `Welcome ${user.username}!`,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
