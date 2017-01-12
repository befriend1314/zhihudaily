"use strict";

let merge = require('webpack-merge');
let config = require('./index');
let webpack = require('webpack');
let baseWebpackConfig = require("./webpack.base.js");
let BrowserSyncPlugin = require('browser-sync-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

const devWebpackConfig = merge(baseWebpackConfig, {
    output: {
        sourceMapFilename: 'sourceMap/[file].map'
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            allChunks: true
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: config.dev.liveReloadPort,
            //            server: {
            //                baseDir: ['dist']
            //            }
            proxy: 'http://localhost:3000'
        })
    ]
});

const outputDebug = (err, stats) => {

    if (err) {
        console.err(err);
    }

    console.log(stats.toString({
        //终端显示带上颜色
        chunks: false,
        colors: true
    }));
};

webpack(devWebpackConfig).watch(null, outputDebug);