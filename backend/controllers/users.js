let usersModels = require("../models/users");

const signup = async (req, res, next) => {
    let { ps, us } = req.body;

    let hasuser = await usersModels.hasuser(us);
    console.log(hasuser)

    if(hasuser){
        res.send({status:-1,msg:'用户已存在!'});
        return
    }

    let result = await usersModels.signup({ us, ps }, res); //因为返回promise 所有可以使用 await 等待
    res.send({status:0,result:result});
};

module.exports = {
    signup,
};
