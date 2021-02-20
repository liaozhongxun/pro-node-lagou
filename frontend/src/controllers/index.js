import indexart from "../views/index.art";
import userListTpl from "../views/user-list.art";
import userPagingTpl from "../views/user-paging.art";
import { getList, signOut, delUser, signUp } from "../models/index";

// let indexartHtml = indexart();

const pageSize = 2;
let pageNumber = 1;
let allPageDatas = [];

// $("#app").html(registerHtml);

const _userAdd = async () => {
    let params = {
        us: $("#exampleInputUser1").val(),
        ps: $("#exampleInputPassword1").val(),
    };

    await signUp({
        Url:"/api/users/signup",
        Method:"POST",
        data: params,
    })

    $("#exampleInputUser1").val("");
    $("#exampleInputPassword1").val("");
    _getlist("");
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
    if (pageCount >= pageNumber) {
        pageNumber = pageNumber;
    } else {
        pageNumber = pageNumber - 1; //如果总页数 < 当前页
    }

    $(`#user-paging li:nth-child(${pageNumber + 1})`).addClass("active");
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

const _getlist = async (name) => {
    allPageDatas = await getList({
        Url: "/api/users/query",
        Method: "POST",
        data: { name: name },
    });
    _paging();
};

const index = (router) => {
    return (req, res, next) => {
        let indexartHtml = indexart({
            userInfo: JSON.parse(localStorage.getItem("userInfo")),
        });

        //渲染首页
        res.render(indexartHtml); //$("#app").html(registerHtml);

        //首屏resize充满屏幕
        $(".wrapper").trigger("resize");

        //初次渲染用户列表
        _getlist("");

        $("#userAdd").on("click", _userAdd);

        //给$("#user-list") 的 .remove添加点击事件，代理即使后面添加的.remove也可以
        $("#user-list").on("click", ".remove", function (e) {
            let del_id = $(this).context.dataset.id.split("_")[1];
            delUser({
                Url: "/api/users/del",
                Method: "POST",
                data: { id: del_id },
            }).then(() => {
                _getlist("");
            });
        });

        //退出
        $("#sign-out").on("click", function () {
            signOut(
                {
                    Url: "/api/users/signout",
                    Method: "GET",
                },
                router
            );
        });
    };
};

export { index };
