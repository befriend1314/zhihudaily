"use strict";

let path     = require('path');
let basePath = path.resolve(__dirname, '../');

const config = {
    npmCmd   : process.env.npm_lifecycle_event,  // 执行命令
    arrArgv  : require('optimist').argv._,   // 传递参数
    basePath : basePath,
    dev: {
        outputPath     : basePath + "/dist",
        goServerPort   : 9500,
        liveReloadPort : 3000
    },
    mobi: {
        outputPath: basePath + "/dist/"
    },
    build: {
        outputPath: basePath + "/build"
    }
};

module.exports = config;
