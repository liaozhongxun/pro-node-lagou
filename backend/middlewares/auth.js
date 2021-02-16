const sessionvis = (req, res, next) => {
    console.log("req.session.username=======================================")
    console.log(req.session.username)
    console.log("req.session.username=======================================")
    if(req.session.username){
        console.log("req.session.username=======================================")
        console.log("session 正常")
        console.log("req.session.username=======================================")
        next()
    }else{
        res.send({status:-1,msg:"请重新登入"})
    }
};


exports.sessionvis = sessionvis