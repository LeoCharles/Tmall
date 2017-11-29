/*
 * @Author: leofe 
 * @Date: 2017-10-28 22:45:52 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-29 10:21:25
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
    // 存储用户输入的数据
    data : {
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },

    // 初始化
    init : function () {
        this.onLoad();
        this.bindEvent();
    },

    onLoad : function () {
        this.loadStepUsername();
    },

    // 绑定事件
    bindEvent : function () {
        var _this = this;
        // 输入用户名，下一步按钮的点击
        $('#submit-username').on('click', function() {
            var username = $.trim($('#username').val());
            // 判断用户名是否为空
            if (username) {
                _user.getQuestion(username, function (res) {
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入用户名');
            }
        });
        // 输入密码提示问题答案，下一步按钮的点击
        $('#submit-question').on('click', function() {
            var answer = $.trim($('#answer').val());
            // 判断密码提示问题答案是否为空
            if (answer) {
                // 检查密码提示问题答案
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                }, function (res) {
                    _this.data.answer = answer;
                    _this.data.token  = res;
                    _this.loadStepPassword();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入密码提示问题的答案');
            }
        });
        // 输入新密码，下一步按钮的点击
        $('#submit-password').on('click', function() {
            var password = $.trim($('#password').val());
            // 判断新密码是否为空
            if (password && password.length >=6) {
                // 检查密码提示问题答案
                _user.resetPassword({
                    username    : _this.data.username,
                    passwordNew : password,
                    forgetToken : _this.data.token
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset';
                    _this.loadStepPassword();
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入不小于6位的新密码');
            }
        });
    },

    // 加载输入用户名的一步
    loadStepUsername : function (){
        $('.step-username').show();
    },

    // 加载输入密码提示问题答案的一步
    loadStepQuestion : function (){
        // 隐藏错误提示
        formError.hide();
        // 显示第二步
        $('.step-username').hide()
            .siblings('.step-question').show()
            .find('.question').text(this.data.question);
    },
    
    // 加载输入新密码一步
    loadStepPassword : function (){
        // 隐藏错误提示
        formError.hide();
        $('.step-question').hide()
            .siblings('.step-password').show();
    },

};

$(function () {
    page.init();
});