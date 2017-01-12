"use strict";

let merge             = require('webpack-merge');
let webpack           = require('webpack');
let baseWebpackConfig = require("./webpack.base.js");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

const  prodWebpackConfig = merge(baseWebpackConfig,{
    output:{
        publicPath : "http://mc.mmmono.com/static/",
        filename: 'js/[name].[chunkhash:8].js',
        chunkFilename: 'js/chunk.[name].[chunkhash:8].js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        }),
        new ExtractTextPlugin({
            filename : 'css/[name].[contenthash:8].css',
            allChunks : true
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
});

const outputDebug = (err, stats) => {

    if(err){
        console.err(err);
    }

    console.log(stats.toString({
        //终端显示带上颜色
        chunks: false,
        colors:true
    }));
};
webpack(prodWebpackConfig).run(outputDebug);