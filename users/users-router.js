const router = require("express").Router();
const Users = require("./users-model");

router.get("/users", async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
