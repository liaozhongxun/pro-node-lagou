var express = require("express");
var router = express.Router();

var { signup } = require("../controllers/users");

/* GET users listing. */
router.post("/signup", signup);

module.exports = router;
