/*
 * @Author: leofe 
 * @Date: 2017-10-21 22:48:11 
 * @Last Modified by: leofe
 * @Last Modified time: 2017-10-21 23:38:51
 */


var _mt = {

    // 网络请求
    request : function (param) {
        var _this = this;
        $.ajax({
            type     : param.method || 'get',
            url      : param.url    || '',
            dataType : param.type   || 'json',
            data     : param.data   || '',
            success  : function (res) {
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
            error    : function (res) {
                typeof param.error === 'function' && param.error(res.statusText);
            }
        });
    },

    // 登录处理
    doLogin : function () {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.locationn.href);
    },

};

module.exports = _mt;







