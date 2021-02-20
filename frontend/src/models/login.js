import { ajax } from "../api";

const loginApi = async (options, router) => {
    let res = await ajax(options);
    try {
        if (res.status == 0) {
            console.log(res);
            localStorage.setItem("userInfo", JSON.stringify(res.result));
            router.go("/index");
        } else {
            alert(res.msg);
        }
    } catch (error) {
        alert("请求出错!");
    }
};

const ruleApi = async (options, router) => {
    let res = await ajax(options);
    try {
        if (res.status == 0) {
            router.go("/index");
        } else {
            router.go("/login");
        }
    } catch (error) {
        router.go("/login");
    }
};

export { loginApi, ruleApi };
