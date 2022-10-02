var express = require("express");
var router = express.Router();
const db = require("../database.js");
require("dotenv").config();

function insertUser(res, user) {
  db.promise()
    .query(
      `INSERT INTO users VALUES (DEFAULT, '${user.username}', '${user.first_name}', '${user.last_name}')`
    )
    .then(() => {
      console.log("added to table!");
      res.send("Successfully added user!");
    });
}

/* GET users listing. */
router.get("/", (req, res) => {
  db.promise()
    .query(`SELECT * FROM users`)
    .then((r) => res.send(JSON.stringify(r[0])));
});

router.post("/", (req, res) => {
  const user = req.body;
  db.promise()
    .query(`SELECT username FROM users`)
    .then((r) => {
      const users = r[0].map((row) => row.username);
      if (users.includes(user.username)) {
        res.send("User already exists!");
      } else insertUser(res, user);
    });
});

module.exports = router;
