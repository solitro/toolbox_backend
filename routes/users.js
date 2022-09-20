var express = require("express");
var router = express.Router();
const db = require("../database.js");
require("dotenv").config();

/* GET users listing. */
router.get("/", (req, res) => {
  let results;
  db.promise()
    .query("SELECT * FROM users")
    .then((r) => res.send(r[0]));
});

module.exports = router;
