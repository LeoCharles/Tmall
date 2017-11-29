/*
 * @Author: leofe 
 * @Date: 2017-10-30 22:02:46 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-29 10:20:03
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
    init : function () {
        this.onLoad();
    },
    
    // 页面加载
    onLoad : function () {
        // 初始化左侧菜单
        navSide.init( {
            name : 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },

    // 加载用户信息
    loadUserInfo : function () {
        var userHtnl = '';
        _user.getUserInfo(function (res) {
            userHtml = _tm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _tm.errorTips(errMsg);
        });
    },
};

$(function () {
    page.init();
});

