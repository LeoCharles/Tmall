/*
 * @Author: leofe 
 * @Date: 2017-10-26 22:20:28 
 * @Last Modified by: leofe
 * @Last Modified time: 2017-10-31 22:52:10
 */

var _tm = require('util/tm.js');

var _user = {
    // 用户登录
   login : function (userInfo, resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/login.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 退出登录
    logout : function (resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 用户注册
    register : function (userInfo, resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/register.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin : function (resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/get_user_info.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检测用户名是否存在
    checkUsername : function (username, resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/check_valid.do'),
            data    : {
                type : 'username',
                str  : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取密码提示问题
    getQuestion : function (username, resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/forget_get_question.do'),
            data    : {
                username : username
            },
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 检查密码提示问题答案
    checkAnswer : function (userInfo, resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/forget_check_answer.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 重置密码
    resetPassword : function (userInfo, resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/forget_reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 获取用户信息
    getUserInfo : function (resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/get_information.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 更新用户信息
    updateUserInfo : function (userInfo, resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/update_information.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },
    // 登录状态下修改密码
    updatePassWord : function (userInfo, resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/reset_password.do'),
            data    : userInfo,
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

};

module.exports = _user;










