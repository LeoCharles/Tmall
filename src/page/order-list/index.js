/*
 * @Author: Leo 
 * @Date: 2017-12-01 16:18:44 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-01 16:37:24
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var navSide       = require('page/common/nav-side/index.js');
var _tm           = require('util/tm.js');
var _user         = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
    // 初始化
    init: function () {
        this.onLoad();
    },

    // 页面加载
    onLoad: function () {
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
    },


};

$(function () {
    page.init();
});
