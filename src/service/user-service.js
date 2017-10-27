/*
 * @Author: leofe 
 * @Date: 2017-10-26 22:20:28 
 * @Last Modified by: leofe
 * @Last Modified time: 2017-10-26 22:38:42
 */

var _tm = require('util/tm.js');

var _user = {
    // 退出登录
    logout : function (resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/user/logout.do'),
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
};

module.exports = _user;










