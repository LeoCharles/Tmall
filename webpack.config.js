/*
 * @Author: leofe 
 * @Date: 2017-10-20 22:08:54 
 * @Last Modified by: leofe
 * @Last Modified time: 2017-10-27 22:10:41
 */

var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量的配置 dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title) {
    return {
        template : './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        title    : title,
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    };
};

// webpack config
var config = {
    // 入口文件
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index'  : ['./src/page/index/index.js'],
        'login'  : ['./src/page/login/index.js'],
        'result' : ['./src/page/result/index.js'],
    },
    // 目标文件的内容
    output: {
        path       : './dist',
        publicPath : '/dist',
        filename   : 'js/[name].js'
    },
    // 外部依赖的声明
    externals: {
        'jquery': 'window.jQuery'
    },
    // 各种loader
    module: {
        loaders: [
          { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
          { test: /\.(jpg|png|gif|svg|eot|ttf|woff)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
          { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    // 配置的别名
    resolve: {
        alias: {
            node_modules : __dirname + '/node_modules',
            util         : __dirname + '/src/util',
            page         : __dirname + '/src/page',
            service      : __dirname + '/src/service',
            image        : __dirname + '/src/image',
        }
    },
    // 插件
    plugins: [
        // 独立通用模块打包到js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name     : 'common',
            filename : 'js/base.js'
        }),
        // 把css单独打包到文件
        new ExtractTextPlugin('css/[name].css'),
        // html模板处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    ]
        
};

// 判断是否为线上环境
if ('dev' === WEBPACK_ENV) {
    // 配置webpack-dev-server开发环境
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;











