import loginart from "../views/login.art";
import { loginApi } from "../models/login";

let loginartHtml = loginart();

const _handleSubmit = (router) => {
    //算简单的柯理化
    return (e) => {
        e.preventDefault(); //拦截表单自发的提交事件

        loginApi({
            Url:"/api/users/signin",
            data: {
                us: $("#login-username").val(),
                ps: $("#login-pwd").val(),
            }
        },router)
    };
};

const login = (router) => {
    return (req, res, next) => {
        res.render(loginartHtml);
        $("#loginin").on("click", _handleSubmit(router));
    };
};

export { login };
