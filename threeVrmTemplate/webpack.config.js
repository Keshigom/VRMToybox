module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    output: {
        path: `${__dirname}/docs`,
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
        openPage: "index.html",
        contentBase: `${__dirname}/docs`,
        watchContentBase: true,
        port: 8080
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    target: ["web", "es5"],
};