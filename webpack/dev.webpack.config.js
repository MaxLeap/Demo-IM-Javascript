var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const PATHS = {
    app: path.join(__dirname, '../client'),
    build: path.join(__dirname, '../prod')
};

module.exports = {
    devtool: 'cheap-source-map',
    entry: {
        app: [PATHS.app + '/index', 'webpack-hot-middleware/client']
    },
    output: {
        path: path.join(__dirname, 'dist'), //文件打包路径
        filename: '[name].js',
        publicPath: '/' //网站运行时访问路径
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        }),

        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin('common.js'),
        new ExtractTextPlugin('[name].css')

    ],
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=react&presets[]=react-hmre'
            },
            {
                test: /\.scss/,
                loader:  ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};

