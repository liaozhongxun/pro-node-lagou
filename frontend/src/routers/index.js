import SMERouter from "sme-router";
import { index } from "../controllers";
import { login } from "../controllers/login";
import { ruleApi } from "../models/login";
const router = new SMERouter("app");

router.use((req) => {
    //路由守卫
    ruleApi({
        Url:"/api/users/rulevis",
        Method:"GET",
        Async:false

    },router)
});

// router.route("/", index(router));
router.route("/index", index(router));
router.route("/login", login(router));

ruleApi({
    Url:"/api/users/rulevis",
    Method:"GET",
    Async:false

},router)

//默认跳转
