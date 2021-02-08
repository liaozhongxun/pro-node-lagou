var express = require("express");
var router = express.Router();

var { signup, queryUser, delUser, modify } = require("../controllers/users");

/* GET users listing. */
router.post("/signup", signup);
router.post("/query", queryUser);
router.post("/del", delUser);
router.post("/modify", modify);

module.exports = router;
