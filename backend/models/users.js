var { Users } = require("../db/schema/users");

let hasuser = (us) => {
    let username = us || "";
    return new Promise((resolve, reject) => {
        Users.find({ us: username }).then((res) => {
            if (res.length > 0) {
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

let signup = (data, res) => {
    console.log(data);

    // let sin = new Users(data);
    // return sin.save(); //保存并返回一个promise

    return new Promise((resolve, reject) => {
        Users.insertMany(data).then(
            (res) => {
                resolve(res);
            },
            (err) => {
                res.send({ status: -1, msg: "插入错误,请检查参数是否正常!" });
            }
        );
    });
};

let queryList = (name, res) => {
    return new Promise((resolve, reject) => {
        Users.find({ us: new RegExp(name) }).then(
            (res) => {
                console.log(name);
                resolve(res);
            },
            (err) => {
                res.send({ status: -1, msg: "查询错误!" });
            }
        );
    });
};

let delList = (id, res) => {
    return new Promise((resolve, reject) => {
        Users.remove({ _id: id }).then(
            (res) => {
                resolve(res);
            },
            (err) => {
                res.send({ status: -1, msg: "删除错误!" });
            }
        );
    });
};

let modifyList = (data, res) => {
    return new Promise((resolve, reject) => {
        // Users.remove({ _id: id }).then(
        //     (res) => {
        //         resolve(res);
        //     },
        //     (err) => {
        //         res.send({ status: -1, msg: "删除错误!" });
        //     }
        // );
    });
};

let signin = ({ us, ps }, res) => {
    return new Promise((resolve, reject) => {
        Users.find({ us: us, ps: ps }).then(
            (res) => {
                if (res.length > 0) {
                    resolve(res);
                } else {
                    res.send({ status: -1, msg: "用户名或密码错误!" });
                }
            },
            (err) => {
                res.send({ status: -1, msg: "查询错误!" });
            }
        );
    });
};

exports.signup = signup;
exports.hasuser = hasuser;
exports.queryList = queryList;
exports.delList = delList;
exports.modifyList = modifyList;
exports.signin = signin;
