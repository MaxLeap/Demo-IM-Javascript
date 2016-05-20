const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack/dev.webpack.config.js');
import render from './render'

const app = new express();
const port = 8002;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {noInfo: true, hot: true, inline: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('asserts'));
app.use(render);

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});