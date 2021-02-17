import loginart from "../views/login.art";

let loginartHtml = loginart();

const _handleSubmit = (router) => {
    //算简单的柯理化
    return (e) => {
        // console.log(e);
        console.log(router);
        e.preventDefault(); //拦截表单自发的提交事件

        let params = {
            us: $("#login-username").val(),
            ps: $("#login-pwd").val(),
        };

        $.ajax({
            url: "/api/users/signin",
            type: "post",
            data: params,

            success: (res) => {
                console.log(res);
                if (res.status == 0) {
                    localStorage.setItem("userInfo", JSON.stringify(res.result));
                    router.go("/index");
                } else {
                    alert(res.msg);
                }
            },
        });

        // router.go("/index");
    };
};

const login = (router) => {
    return (req, res, next) => {
        res.render(loginartHtml);
        $("#loginin").on("click", _handleSubmit(router));
    };
};

export { login };
