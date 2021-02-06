import indexart from "../views/index.art";
import registerart from "../views/register.art";
import loginart from "../views/login.art";

let indexartHtml = indexart();
let registerHtml = registerart();
let loginartHtml = loginart();

// $("#app").html(registerHtml);

const _handleSubmit = (router) => {
    //算简单的柯理化
    return (e) => {
        // console.log(e);
        console.log(router);
        e.preventDefault(); //拦截表单自发的提交事件
        router.go("/index");
    };
};
const index = (router) => {
    return (req, res, next) => {
        res.render(indexartHtml); //$("#app").html(registerHtml);
        $(".wrapper").trigger("resize");
    };
};

const login = (router) => {
    return (req, res, next) => {
        res.render(loginartHtml);
        $("#loginin").on("click", _handleSubmit(router));
    };
};

const register = (router) => {
    return (req, res, next) => {
        res.render(registerHtml);
    };
};

export { index, login, register };
