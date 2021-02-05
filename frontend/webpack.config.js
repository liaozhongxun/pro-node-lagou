// 默认配置文件 可通过 --config 改变

var HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
//导出模块
module.exports = {
    //配置环境  (默认生产环境production)
    mode: "development",

    //配置入口
    entry: {
        app: "./src/app.js",
    },

    devtool: "source-map", //开发环境调试代码

    //配置出口
    output: {
        path: path.join(__dirname, "./dist"), //绝对路径输出
        filename: "app.js", //输出文件名
    },

    //配置服务
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
    },

    //配置插件
    plugins: [
        //默认找到public/index.html 打包到dist并映入输入出的js文件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./public/index.html"),
            filename: "index.html",
            inject: true, //将js注入到head中
        }),
        new CopyPlugin({
            patterns: [
                // {
                //     from:path.join(__dirname,"./public/favicon.ico"),
                //     to: './test0',
                // },
                // {
                //     from: "/**/*",
                //     to: "test1",
                // },
                {
                    from: "public/*.ico",
                    to({ context, absoluteFilename }) {
                      return "./[name].[ext]";
                    },
                },
            ],
        }),
    ],
};
