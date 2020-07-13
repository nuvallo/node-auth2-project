const router = require("express").Router();
const Users = require("./users-model");
const restrict = require("../middleware/restrict");

router.get("/users", restrict("admin"), async (req, res, next) => {
  try {
    res.json(await Users.find());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
