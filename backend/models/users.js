var { Users } = require("../db/schema/users");

let hasuser = (us) => {
    let username = us || "";
    return new Promise((resolve,reject)=>{
        Users.find({ us: username }).then((res) => {
            if (res.length > 0) {
                resolve(true)
            } else {
                resolve(false)
            }
        });
    })
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
                res.send("插入错误,请检查参数是否正常!");
            }
        );
    });
};

exports.signup = signup;
exports.hasuser = hasuser;
