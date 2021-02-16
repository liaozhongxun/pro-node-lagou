import SMERouter from "sme-router";
import { index, login, register } from "../controllers";
const router = new SMERouter("app");

router.route("/", index(router));
router.route("/index", index(router));
router.route("/login", login(router));
router.route("/register", register(router));

router.go("/login");
