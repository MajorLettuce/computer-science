const path = require('path')

module.exports = {
    // devtool: false,
    mode: 'development',
    entry: './src/index.js',
    devtool: 'inline-source-map',
    devServer: {
        static: './docs',
        hot: true,
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs/assets/js'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
};
