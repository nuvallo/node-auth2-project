const db = require("../data/config");

function add(user) {
  return db("users").insert(user);
}

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}

module.exports = {
  find,
  findById,
  findBy,
  add,
};
