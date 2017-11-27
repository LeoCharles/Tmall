/*
 * @Author: leofe 
 * @Date: 2017-10-26 23:11:55 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-27 22:54:22
 */

require('./index.css');
var _tm   = require('util/tm.js');

// 通用页面头部
var header = {
    // 初始化
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    // keyword存在时回填
    onLoad : function () {
        var keyword = _tm.getUrlParam('keyword');
        // keyword存在，则回填输入框
        if(keyword) {
            $("#search-input").val(keyword);
        }
    },
    // 绑定事件
    bindEvent : function () {
        var _this = this;
        // 点击提交
        $('#search-btn').on('click', function () {
            _this.searchSubmit();
        });
        // Enter按键提交
        $('#search-input').on('keyup', function (e) {
            // Enter键的 keyCode 是13
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        });
    },
    // 搜索提交
    searchSubmit : function () {
        var keyword = $.trim($('#search-input').val());
        if(keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _tm.goHome();
        }
    },
};

header.init();

