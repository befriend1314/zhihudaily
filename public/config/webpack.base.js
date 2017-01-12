"use strict";

let fs                    = require('fs');
let config                = require("../config");
let webpack               = require('webpack');
let ExtractTextPlugin     = require("extract-text-webpack-plugin");
let HtmlWebpackPlugin     = require('html-webpack-plugin');
let WebpackNotifierPlugin = require('webpack-notifier');

let env        = config.npmCmd;
let basePath   = config.basePath;
let arrArgv    = config.arrArgv;
let outputPath = config[env].outputPath;
let srcDir     = basePath + '/src/js/';

let exportConfig = {
    entry:{
        app: config.basePath + "/src/js/app.js"
    },
    output: {
        path: outputPath,
        jsonpFunction:'starCityJsonp',
        filename: 'js/[name].js',
        chunkFilename: 'js/chunk_[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': basePath + '/node_modules/vue/dist/vue.min.js',
            'remodal-js': basePath + '/node_modules/remodal/dist/remodal.js',
            'remodal-css': basePath + '/node_modules/remodal/dist/remodal.css',
            'remodal-theme-css': basePath + '/node_modules/remodal/dist/remodal-default-theme.css',
            'cropper-js': basePath + '/node_modules/cropper/dist/cropper.js',
            'cropper-css': basePath + '/node_modules/cropper/dist/cropper.css'
            
        }
    },
    externals: {
        'jquery': 'jQuery',
        '$': 'jQuery'
        
    },
    devtool: env == 'dev' ? 'source-map' : false, //eval-source-map
    module: {
        rules:[{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                include: basePath
            },{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallbackLoader:'style-loader', loader:'css-loader?sourceMap!postcss-loader'}),
                include: basePath
            },{
                test: /\.sass$/,
                loader: ExtractTextPlugin.extract({fallbackLoader:'style-loader', loader:'css-loader?sourceMap!postcss-loader!sass-loader?indentedSyntax'}),
                include: basePath
            },{
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({fallbackLoader:'style-loader', loader:'css-loader?sourceMap!postcss-loader!sass-loader'}),
                include: basePath
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    postcss: [require('postcss-cssnext')()],
                    loaders: {
                        css: ExtractTextPlugin.extract({loader: 'css-loader?sourceMap'}),
                        sass: ExtractTextPlugin.extract({loader: 'css-loader?sourceMap!sass-loader?indentedSyntax' }),
                        scss: ExtractTextPlugin.extract({loader: 'css-loader?sourceMap!sass-loader' })
                    },
                }
            },{
                test: /\.pug$/,
                loader: "pug-loader",
                options: {
                    pretty: env == 'dev' ? true : false
                }
            },{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: env == 'dev' ? 'img/[name].[ext]' : 'img/[name].[hash:7].[ext]'
                }
            },{
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: env == 'dev' ? 'fonts/[name].[ext]' : 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins:[
        new webpack.NoErrorsPlugin(),
        new WebpackNotifierPlugin({alwaysNotify: true})
    ]
};

const getAllEnteyWithHtml = (arrArgv) => {

    let entrys = {};

    fs.readdirSync(srcDir).forEach(function(file){
        let name = file.slice(0,file.lastIndexOf('.'));
        entrys[name] = srcDir + file;
    });

    if(arrArgv.length){
        let custom_entrys = {};
        arrArgv.forEach(function(src){
            if(!entrys[src]){
                throw new Error('参数错误，检查 src/js/');
            }else{
                custom_entrys[src] = entrys[src];
            }
        });

        entrys = custom_entrys;
    }

    for(var i in entrys){
        let filename = `${outputPath}/${i}.html`;

        if(i == 'admin'){
            filename = `${outputPath}/index.html`;
        }
        exportConfig.plugins.push(new HtmlWebpackPlugin({
            filename: filename,
            template: `${basePath}/src/tmpl/${i}.pug`,
            inject: 'body',
            chunks:[i]
        }));
    }

    exportConfig.entry = entrys;
};

getAllEnteyWithHtml(arrArgv);

module.exports = exportConfig;
