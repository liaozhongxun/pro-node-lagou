var express = require("express");
var router = express.Router();

var { signup, queryUser, delUser, modify, signin, signout ,rulevis} = require("../controllers/users");
const { sessionvis } = require("../middlewares/auth");

/* GET users listing. */
router.post("/signup", sessionvis, signup);
router.post("/query", queryUser);
router.post("/del", sessionvis, delUser);
router.post("/modify", sessionvis, modify);
router.post("/signin", signin);
router.get("/signout", sessionvis, signout);
router.get("/rulevis", rulevis);

module.exports = router;
