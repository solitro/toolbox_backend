var express = require("express");
var router = express.Router();
const db = require("../database.js");
require("dotenv").config();

//check if user exists
function userExists(key, value) {
  let result;
  db.promise()
    .query(`SELECT ${key} FROM users`)
    .then((result) => {
      for (let i = 0; i < result[0].length; i++) {
        if (value == result[0][i][key]) return true;
      }
    });
  return false;
}

/* GET users listing. */
router.get("/", (req, res) => {
  db.promise()
    .query("SELECT id FROM users")
    .then((r) => res.send(r[0]));
});

router.post("/", async (req, res) => {
  const { id, first_name, last_name } = req.body;
  if (id && first_name && last_name) {
    if (!userExists("id", id)) {
      db.promise()
        .query(
          `INSERT INTO users VALUES('${id}', '${first_name}', '${last_name}')`
        )
        .then((r) => res.send(r[0]));
    } else res.body = "That Username already exists!";
  } else res.body = "Please make sure you fill in all fields.";
  res.send();
});

module.exports = router;
