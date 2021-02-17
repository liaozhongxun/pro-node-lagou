const sessionvis = (req, res, next) => {
    if(req.session.username){
        next()
    }else{
        res.send({status:-1,msg:"请重新登入"})
    }
};


exports.sessionvis = sessionvis