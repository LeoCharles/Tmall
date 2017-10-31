/*
 * @Author: leofe 
 * @Date: 2017-10-20 21:46:27 
 * @Last Modified by: leofe
 * @Last Modified time: 2017-10-28 22:31:22
 */

require('./index.css');
require('page/common/nav-simple/index.js');
var _tm   = require('util/tm.js');
var _user = require('service/user-service.js');

// 表单的错误提示
var formError = {
    show : function(errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function() {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    // 初始化
    init : function () {
        this.bindEvent();
    },
    // 绑定事件
    bindEvent : function () {
        var _this = this;
        // 点击登录按钮提交
        $('#submit').on('click', function() {
            _this.submit();
        });
        // 按Enter键提交
        $('.user-content').on('keyup', function(e) {
            if(e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function () {
        var formData = {
                username : $.trim($('#username').val()),
                password : $.trim($('#password').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        if (validateResult.status) {
            // 验证成功，提交
            _user.login(formData, function (res) {
                window.location.href = _tm.getUrlParam('redirect') || './index.html';
            }, function (errMsg) {
                formError.show(errMsg);
            });
        } else {
            // 验证失败，提示
            formError.show(validateResult.msg);
        }
    },
    // 表单验证
    formValidate : function (formData) {
        var result = {
            status : false,
            msg    : ''
        };
        if (!_tm.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空！';
            return result;
        }
        if (!_tm.validate(formData.password, 'require')) {
            result.msg = '密码不能为空！';
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