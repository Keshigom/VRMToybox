const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/ts/index.ts",
    output: {
        path: path.resolve(__dirname, `../docs/${path.basename(__dirname)}`),
        publicPath: `/${path.basename(__dirname)}`,
        filename: "app.js"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
        ]
    },
    devServer: {
        open: true,
        openPage: `${path.basename(__dirname)}/index.html`,
        contentBase: path.resolve(__dirname, `../docs`),
        watchContentBase: true,
        port: 8080,
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    target: ["web", "es5"],
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/html/index.html'
        })
    ]
};