var express = require("express");
var router = express.Router();

var { signup, queryUser, delUser, modify ,signin} = require("../controllers/users");

/* GET users listing. */
router.post("/signup", signup);
router.post("/query", queryUser);
router.post("/del", delUser);
router.post("/modify", modify);
router.post("/signin", signin);

module.exports = router;
