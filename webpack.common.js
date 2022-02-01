const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (mode) => ({
    target: "web",
    stats: "minimal",
    entry: {
        main: "./src/client/index.ts"
    },
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "[name].[contenthash].js"
    },
    optimization: {
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/client/index.html",
            chunks: ["main"],
            minify: mode == "development" ? undefined : {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.(svg|png|jpe?g|gif|otf|ttf)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        esModule: false,
                        name: "[name].[hash].[ext]",
                        outputPath: "assets"
                    }
                }
            }
        ],
    }
});