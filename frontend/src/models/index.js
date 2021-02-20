import { ajax } from "../api";

const signOut = async (options, router) => {
    let res = await ajax(options);
    try {
        if (res.status == 0) {
            localStorage.setItem("userInfo", JSON.stringify({}));
            router.go("/login");
        }
    } catch (error) {
        alert("请求出错!");
    }
};

const getList = async (options) => {
    let res = await ajax(options);
    try {
        if (res.status == 0) {
            return res.result;
        } else {
            alert(res.msg);
        }
    } catch (error) {
        alert("请求出错!");
    }
};

const delUser = async (options) => {
    let res = await ajax(options);
    try {
        if (res.status == 0) {
            alert("删除成功");
        } else {
            alert(res.msg);
        }
    } catch (error) {
        alert("请求出错!");
    }
};

const signUp = async (options) => {
    let res = await ajax(options);
    try {
        if (res.status == 0) {
            alert("添加成功");
        } else {
            alert(res.msg);
        }
    } catch (error) {
        alert("请求出错!");
    }
};

export { signOut, getList, delUser, signUp };
