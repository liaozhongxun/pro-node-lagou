import { ajax } from "../api";

const loginApi = async (options,router) => {
    let res = await ajax(options);
    try {
        if (res.status == 0) {
            localStorage.setItem("userInfo", JSON.stringify(res.result));
            router.go("/index");
        } else {
            alert(res.msg);
        }
    } catch (error) {
        alert("请求出错!");
    }
};

export { loginApi };
