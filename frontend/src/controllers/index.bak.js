import indexart from "../views/index.art";
import loginart from "../views/login.art";
import userListTpl from "../views/user-list.art";
import userPagingTpl from "../views/user-paging.art";

// let indexartHtml = indexart();
let loginartHtml = loginart();

const pageSize = 2;
let pageNumber = 1;
let allPageDatas = [];

// $("#app").html(registerHtml);

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
                    localStorage.setItem("userInfo",JSON.stringify(res.result))
                    router.go("/index");
                } else {
                    alert(res.msg);
                }
            },
        });

        // router.go("/index");
    };
};

const _userAdd = () => {
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

const _paging = () => {
    let total = allPageDatas.length;
    let pageCount = Math.ceil(total / pageSize);
    let pageArr = new Array(pageCount);

    $("#user-paging").html(
        userPagingTpl({
            pageArr: pageArr,
        })
    );

    _getPageData(pageNumber, allPageDatas);

    //删除之后数据停了当前页面，删除到一定程度时，自动向前高亮
    if (pageCount  >= pageNumber) {
        pageNumber = pageNumber;
    } else {
        pageNumber = pageNumber - 1 ;//如果总页数 < 当前页
    }

    $(`#user-paging li:nth-child(${pageNumber+1})`).addClass("active");
    $("#user-paging li.page").on("click", function () {
        console.log($(this).context.innerText);
        $(this).addClass("active").siblings().removeClass("active");
        pageNumber = Number($(this).context.innerText);
        _getPageData(pageNumber, allPageDatas);
    });
};

const _getPageData = (pageNumber, data) => {
    //获取分页后的数据
    let start = (pageNumber - 1) * pageSize;
    let end = pageNumber * pageSize;
    $("#user-list").html(
        userListTpl({
            data: data.slice(start, end),
        })
    );
};

const _getlist = (name) => {
    $.ajax({
        url: "/api/users/query",
        type: "post",
        data: { name: name },

        success: (res) => {
            if (res.status == 0) {
                // $("#user-list").html(
                //     userListTpl({
                //         data: res.result,
                //     })
                // );
                allPageDatas = res.result;
                _paging();
            } else {
                alert(res.msg);
            }
        },
    });
};

const index = (router) => {
    return (req, res, next) => {
        let indexartHtml = indexart({
            userInfo:JSON.parse(localStorage.getItem('userInfo'))
        });
        res.render(indexartHtml); //$("#app").html(registerHtml);
        $(".wrapper").trigger("resize");

        $("#userAdd").on("click", _userAdd);

        _getlist("");

        //给$("#user-list") 的 .remove添加点击事件，代理即使后面添加的.remove也可以
        $("#user-list").on("click", ".remove", function (e) {
            let del_id = $(this).context.dataset.id.split("_")[1];
            $.ajax({
                url: "/api/users/del",
                type: "post",
                data: { id: del_id },

                success: (res) => {
                    alert(res.msg);
                    _getlist("");
                },
            });
        });

        //退出
        $("#sign-out").on('click',function(){
            $.ajax({
                url: "/api/users/signout",
                type: "get",
                success: (res) => {
                    if(res.status == 0){
                        router.go("/login");
                    }
                },
            });
        })
    };
};

const login = (router) => {
    return (req, res, next) => {
        res.render(loginartHtml);
        $("#loginin").on("click", _handleSubmit(router));
    };
};


export { index, login };
