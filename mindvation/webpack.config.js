var webpack = require('webpack');
var path = require("path");

module.exports = {
    devtool: 'source-map',
    entry: ['./src/index.js','webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server'],
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: 'mindvation.bundle.js',
        publicPath: 'http://localhost:8080/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['react-hot-loader', 'babel-loader?' + JSON.stringify({presets: ['react', 'es2015', 'stage-0']})],
                exclude: /node_modules/
            },
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
            {test: /\.(eot|woff|ttf|woff2|png|svg)$/, loader: "file-loader"}
        ],
    },
    devServer: {
        host: '0.0.0.0',
        proxy: {
            '/api/*': 'http://localhost:8080',
        },
    }
};
