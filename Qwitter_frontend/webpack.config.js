const path = require("path");

module.exports = {
    entry: "./src/index.jsx",
    mode: "development",
    output: {
        filename: "./main.js"
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
        watchContentBase: true,
        progress: true,
        historyApiFallback: true,
        proxy: [{
            context: ['/images', '/api'],
            target: 'http://localhost:5000',
        }]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    }
};
