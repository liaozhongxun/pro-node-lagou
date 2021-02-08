import indexart from "../views/index.art";
import registerart from "../views/register.art";
import loginart from "../views/login.art";
import userListTpl from "../views/user-list.art";

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

const _userAdd = () => {
    console.log($("#exampleInputUser1").val());
    console.log($("#exampleInputPassword1").val());
    let params = {
        us: $("#exampleInputUser1").val(),
        ps: $("#exampleInputPassword1").val(),
    };
    $.ajax({
        url: "/api/users/signup",
        type: "post",
        data: params,

        success: (res) => {
            console.log(res);
            if (res.status == 0) {
                $("#exampleInputUser1").val("");
                $("#exampleInputPassword1").val("");
                alert("添加成功");
                _getlist("");
            } else {
                alert(res.msg);
            }
        },
    });
};

const _getlist = (name) => {
    $.ajax({
        url: "/api/users/query",
        type: "post",
        data: { name: name },

        success: (res) => {
            if (res.status == 0) {
                $("#user-list").html(
                    userListTpl({
                        data: res.result,
                    })
                );
            } else {
                alert(res.msg);
            }
        },
    });
};

const index = (router) => {
    return (req, res, next) => {
        res.render(indexartHtml); //$("#app").html(registerHtml);
        $(".wrapper").trigger("resize");

        $("#userAdd").on("click", _userAdd);

        _getlist("");
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
