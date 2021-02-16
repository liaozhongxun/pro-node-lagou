const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hash = (ps) => {
    ps = ps + "";
    return bcrypt.hash(ps, saltRounds);
};

exports.compare = (ps,pshash)=>{
    return bcrypt.compare(ps, pshash)
}


