var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// var cors = require("cors");
var cookieSession = require("cookie-session");

require("./db/connect");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(cors());

//
app.use( //直接在用户登录时 req.session.username = xxx 就 能保存了
    cookieSession({
        name: "session",
        keys: ["key1", "key2"],
    })
);

/**
 *  session方式1
 *  app.use( //直接在用户登录时 req.session.username = xxx 就 能保存了
 *      cookieSession({
 *          name: "session",
 *          keys: ["key1", "key2"],
 *      })
 *  );
 * 
 */

app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
