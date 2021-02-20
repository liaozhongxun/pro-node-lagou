const { token } = require("morgan");
let usersModels = require("../models/users");
const { hash, compare, jwtVerify, jwtSign } = require("../utils/tools");

const signup = async (req, res, next) => {
    let { ps, us } = req.body;

    let hasuser = await usersModels.hasuser(us);
    if (hasuser) {
        res.send({ status: -1, msg: "用户已存在!" });
        return;
    }

    let bcryptPs = await hash(ps); //相同两次得到的加密串不同

    let result = await usersModels.signup({ us, ps: bcryptPs }, res); //因为返回promise 所有可以使用 await 等待
    res.send({ status: 0, msg: "ok" });
};

const queryUser = async (req, res, next) => {
    let { name } = req.body;
    name = name || "";
    let result = await usersModels.queryList(name, res);
    console.log(result);
    res.send({ status: 0, msg: "ok", result: result });
};

const delUser = async (req, res, next) => {
    let { id } = req.body;
    let result = await usersModels.delList(id, res);
    console.log(result);
    res.send({ status: 0, msg: "ok", result: result });
};

const modify = async (req, res, next) => {
    let data = req.body;
    let result = await usersModels.modifyList(data, res);
    console.log(result);
    res.send({ status: 0, msg: "ok", result: result });
};

const signin = async (req, res, next) => {
    let { ps, us } = req.body;

    let hasuser = await usersModels.hasuser(us);
    if (hasuser) {
        // let result = await usersModels.signin({ ps, us }, res);
        // console.log(result);
        // res.send({ status: 0, msg: "ok", result: result });
        let pshash = hasuser[0].ps; //如果用户存在拿到加密后的hash
        //通过compare验证登入密码与注册加密的密码是否匹配
        if (await compare(ps, pshash)) {
            // session方式2
            //req.session.username = us; //通过cookie-session设置session

            let tk = jwtSign({ username: us });

            res.set("X-Access-Token", tk);

            res.send({
                status: 0,
                msg: "ok",
                result: {
                    token: tk,
                    username: us,
                },
            });

            // 手动往前端种cookie，相同域名下任何请求都会自动写的cookie，包括图片资源
            // const sessionId = randomstring.generate();
            // res.set('Set-Cookie',`sessionId=${sessionId};Path=/;HttpOnly`)
        } else {
            res.send({ status: -1, msg: "用户名或密码错误!" });
        }
    } else {
        res.send({ status: -1, msg: "用户不存在" });
    }
};

//退出登录
const signout = async (req, res, next) => {
    //session方式退出
    //req.session = null;
    res.send({ status: 0, msg: "ok", result: "请重新登录" });
};

//权限验证
const rulevis = async (req, res, next) => {
    let result  =  jwtVerify(req.get("X-Access-Token"))

    if (result.username) {
        res.send({ status: 0, msg: "状态正常" });
    } else {
        res.send({ status: -1, msg: result });
    }
};

module.exports = {
    signup,
    queryUser,
    delUser,
    modify,
    signin,
    signout,
    rulevis,
};
