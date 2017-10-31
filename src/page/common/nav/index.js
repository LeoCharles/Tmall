/*
 * @Author: leofe 
 * @Date: 2017-10-26 21:48:39 
 * @Last Modified by: leofe
 * @Last Modified time: 2017-10-28 22:26:33
 */
require('./index.css');
var _tm   = require('util/tm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

var nav = {
    // 初始化
    init : function () {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    // 绑定事件
    bindEvent : function () {
        // 登录
        $('.js-login').on('click', function () {
            _tm.doLogin();
        });
        // 注册
        $('.js-register').on('click', function () {
           window.location.href = './user-register.html';
        });
        // 退出
        $('.js-logout').on('click', function () {
            _user.logout(function(res) {
                window.location.reload();
            }, function (errMsg) {
                _tm.errorTips(errMsg);
            });
         });
    },
    // 读取用户信息
    loadUserInfo : function () {
        _user.checkLogin(function(res) {
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function (errMsg) {
           // do nothing
        });
    },
    // 读取购物车数量
    loadCartCount : function () {
        _cart.getCartCount(function(res) {
            $('.nav .cart-count').text(res || 0);
        }, function (errMsg) {
            $('.nav .cart-count').text(0);
        });
    },
};

module.exports = nav.init();











