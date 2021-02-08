var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    us: { type: String, required: true },
    ps: { type: String, required: true },
    age: { type: Number, default: 20 },
});

//将schema对象转化为数据模型
var Users = mongoose.model("user", userSchema);

exports.Users = Users;