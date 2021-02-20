const { jwtVerify } = require("../utils/tools");

const sessionvis = (req, res, next) => {

    let result  =  jwtVerify(req.get("X-Access-Token"))
    console.log(result)

    //if(req.session.username){} //session方式验证
    if(result.username){
        next()
    }else{
        res.send({status:-1,msg:result})
    }
};


exports.sessionvis = sessionvis