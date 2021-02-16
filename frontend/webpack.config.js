// 默认配置文件 可通过 --config 改变

const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
//复制文件
const CopyPlugin = require("copy-webpack-plugin");
//清空dist文件夹
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

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
        filename: "[name].[hash].js", //输出文件名
    },

    //配置服务
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true,
        // bonjour: true,
        // hot: true,
        // hotOnly: true,
        //inline: true,
        //请求到 /api/users 现在会被代理到请求 http://localhost:3006/api/users。
        //?!接口域名到底是自动获取还是通过变量配置好
        proxy: {
            "/api": {
                target: "http://localhost:3006",
                pathRewrite: { "^/api": "/api" },
            },
        },
    },

    //配置loader 加载器
    module: {
        rules: [
            {
                test: /\.art$/,
                loader: "art-template-loader",
                options: {
                    // art-template options (if necessary)
                    // @see https://github.com/aui/art-template
                },
            },
            {
                test: /\.css$/,
                loaders: ["style-loader", "css-loader"],
            },
        ],
    },

    //配置插件
    plugins: [
        //默认找到public/index.html 打包到dist并映入输入出的js文件
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "./public/index.html"),
            filename: "index.html",
            inject: true,
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
                        return "./[name].[hash].[ext]";
                    },
                },
                {
                    from: "public/libs",
                    to: "./libs",
                },
            ],
        }),
        new CleanWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin()
    ],
};
