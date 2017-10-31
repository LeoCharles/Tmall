/*
 * @Author: leofe 
 * @Date: 2017-10-21 22:48:11 
 * @Last Modified by: leofe
 * @Last Modified time: 2017-10-28 21:53:13
 */

var conf = {
    serverHost: '',
};
 // html模板引擎
var Hogan = require('hogan.js');

var _tm = {
    // 网络请求
    request : function (param) {
        var _this = this;
        $.ajax({
            type     : param.method || 'get',
            url      : param.url    || '',
            dataType : param.type   || 'json',
            data     : param.data   || '',
            success : function (res) {
                // 请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                // 未登录状态，需要强制登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                // 请求数据错误
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }

            },
            error : function (res) {
                typeof param.error === 'function' && param.error(res.statusText);
            }
        });
    },
    // 获取服务器地址
    getServerUrl : function (path) {
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam : function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html(基于Hogan)
    renderHtml : function (htmlTemplate, data) {
        var template = Hogan.compile(htmlTemplate),
            result   = template.render(data);
        return result;
    },
    // 成功的提示
    successTips : function (msg) {
        alert(msg || '操作成功！')
    },
    // 错误的提示
    errorTips : function (msg) {
        alert(msg || '哪里不对了~');
    },
    // 表单字段验证， 验证是否为非空、手机号、邮箱
    validate : function (value, type) {
        var value = $.trim(value);
        // 非空验证
        if ('require' === type) {
            return !!value;
        }
        // 手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value);
        }
        // 邮箱验证
        if ('email' === type) {
            return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value);
        }
    },
    // 登录处理
    doLogin : function () {
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    // 返回首页
    goHome : function () {
        window.location.href = './index.html';
    },
};

module.exports = _tm;







