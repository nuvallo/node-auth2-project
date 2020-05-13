const router = require("express").Router();
const Users = require("./users-model.js");

router.get("/", async (req, res) => {
  console.log("token", req.decodedToken);
  try {
    res.status(201).json(await Users.find());
  } catch (error) {
    res.status(400).json({ errorMessage: "Failed to retrieve users" });
  }
});

module.exports = router;
