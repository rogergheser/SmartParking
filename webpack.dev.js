const common = require("./webpack.common");
const { merge } = require("webpack-merge");

module.exports = merge(common("development"), {
    mode: "development",
    devtool: "inline-source-map",
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    "sass-loader"
                ],
            },
        ]
    },
    devServer: {
        client: { logging: "none" },
        watchFiles: ["./src/client/**/*.html"],
        historyApiFallback: true,
        allowedHosts: "all",
        open: true
    }
});