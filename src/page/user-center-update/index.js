/*
 * @Author: leofe 
 * @Date: 2017-10-30 22:05:54 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-29 10:20:25
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
        this.bindEvent();
    },

    bindEvent : function () {
        var _this = this;
        // 点击提交按钮
        $(document).on('click', '.btn-submit', function () {
            var userInfo = {
                phone    : $.trim($('#phone').val()),
                email    : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer   : $.trim($('#answer').val())
            };
            validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                _user.updateUserInfo(userInfo, function (res, msg) {
                    _tm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function (errMsg) {
                    _tm.errorTips(errMsg);
                });
            } else {
                _tm.errorTips(validateResult.msg);
            }
        });
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
    
    // 验证字段信息
    validateForm : function (formData) {
        var result = {
            status : false,
            msg    : ''
        };
        if (!_tm.validate(formData.phone, 'phone')) {
            result.msg = '手机号格式不正确！';
            return result;
        }
        if (!_tm.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确！';
            return result;
        }
        if (!_tm.validate(formData.question, 'require')) {
            result.msg = '密码提示问题不能为空！';
            return result;
        }
        if (!_tm.validate(formData.answer, 'require')) {
            result.msg = '密码提示问题的答案不能为空！';
            return result;
        }
        // 通过验证， 返回正确提示
        result.status = true;
        result.msg    = '验证通过！';
        return result;
    },
};

$(function () {
    page.init();
});