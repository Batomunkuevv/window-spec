const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'map.min.js',
    },
    devServer: {
        static: path.join(__dirname, './build'),
        compress: true,
        port: 5555,
    },
};