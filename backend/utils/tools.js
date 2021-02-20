const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const saltRounds = 10;

//bcrypt 加密
exports.hash = (ps) => {
    ps = ps + "";
    return bcrypt.hash(ps, saltRounds);
};

//bcrypt 验证密码
exports.compare = (ps, pshash) => {
    return bcrypt.compare(ps, pshash);
};

//jwt 非对称加密
let privateKey = fs.readFileSync(path.join(__dirname, "../keys/rsa_private_key.pem"));
let publicKey = fs.readFileSync(path.join(__dirname, "../keys/rsa_public_key.pem"));

exports.jwtSign = (playload) => {
    // playload.ctime = Date.now();
    // playload.exp = 1000 * 60 * 30; //30分钟过期
    return jwt.sign(playload, privateKey, { algorithm: "RS256" });
};
exports.jwtVerify = (token) => {
    if (token != "null"){
        return jwt.verify(token, publicKey);
    }else{
        return {}
    }
};
