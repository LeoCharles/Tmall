/*
 * @Author: leofe 
 * @Date: 2017-10-31 21:51:36 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-29 10:21:42
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _tm     = require('util/tm.js');
var _user   = require('service/user-service.js');

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
                password        : $.trim($('#password').val()),
                passwordNew     : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            };
            validateResult = _this.validateForm(userInfo);
            if (validateResult.status) {
                // 更改用户密码
                _user.updatePassWord({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function (res, msg) {
                    _tm.successTips(msg);
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
            name : 'user-pass-update'
        });
    },
    
    // 验证字段信息
    validateForm : function (formData) {
        var result = {
            status : false,
            msg    : ''
        };
        // 原密码是否为空
        if (!_tm.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空！';
            return result;
        }
        // 验证新密码长度
        if (!formData.passwordNew || formData.passwordNew.length < 6) {
            result.msg = '密码长度不能少于6位！';
            return result;
        }
        // 验证两次密码是否一致
        if (formData.passwordNew !== formData.passwordConfirm) {
            result.msg = '两次输入的密码不一致！';
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