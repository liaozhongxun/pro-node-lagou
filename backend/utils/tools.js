const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.hash = (ps) => {
    ps = ps + "";
    return bcrypt.hash(ps, saltRounds);
};
