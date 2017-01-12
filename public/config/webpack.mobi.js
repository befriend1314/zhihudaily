"use strict";

let path              = require('path');
let merge             = require('webpack-merge');
let webpack           = require('webpack');
let AdmZip            = require('adm-zip');
let color             = require('colors');
let baseWebpackConfig = require("./webpack.base.js");
let ExtractTextPlugin = require("extract-text-webpack-plugin");

const  prodWebpackConfig = merge(baseWebpackConfig,{
    output:{
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk.[name].[chunkhash:8].js'
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new ExtractTextPlugin({
            filename : '[name].[contenthash:8].css',
            allChunks : true
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
});

const zipFiles = (entry) => {

    let zip  = new AdmZip();
    let time = new Date().getTime();
    let op   = prodWebpackConfig.output.path;
    let name = '../zip/jsPatch.'+ time +'.zip';

    entry.forEach((file)=>{
        console.log(file);
        zip.addLocalFile(path.resolve(__dirname,file));
    });
    zip.writeZip(op + name);
    console.log( color.gray('已生成压缩文件：') + color.green(name) + ' ! \n');

};

const outputDebug = (err, stats) => {

    if(err){
        console.err(err);
    }

    console.log(stats.toString({
        //终端显示带上颜色
        chunks: false,
        colors:true
    }));

    let assets = stats.compilation.assets;
    let path   = stats.compilation.outputOptions.path;
    let zipArr = [];

    for(var i in stats.compilation.entrypoints){
        // zipArr[i] = {
        //     name: i,
        //     hash: stats.compilation.hash,
        //     files: [],
        //     time: stats.endTime
        // };
        for(var j in assets){
            if(j.indexOf(i) != -1){
                zipArr.push(path+j);
                // zipArr[i].files.push(path+j);
            }
        }
    }
    zipFiles(zipArr);

};
webpack(prodWebpackConfig).run(outputDebug);