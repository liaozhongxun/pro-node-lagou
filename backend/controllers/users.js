let usersModels = require("../models/users");

const signup = async (req, res, next) => {
    let { ps, us } = req.body;

    let hasuser = await usersModels.hasuser(us);
    if (hasuser) {
        res.send({ status: -1, msg: "用户已存在!" });
        return;
    }

    let result = await usersModels.signup({ us, ps }, res); //因为返回promise 所有可以使用 await 等待
    res.send({ status: 0, result: result });
};

const queryUser = async (req, res, next) => {
    let { name } = req.body;
    name = name || ""; 
    let result = await usersModels.queryList(name, res);
    console.log(result);
    res.send({status:0,msg:'ok',result:result});
};

const delUser = async (req, res, next) => {
    let { id } = req.body;
    let result = await usersModels.delList(id, res);
    console.log(result);
    res.send({status:0,msg:'ok',result:result});
};

module.exports = {
    signup,
    queryUser,
    delUser,
};
