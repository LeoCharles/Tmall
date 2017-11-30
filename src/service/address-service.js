/*
 * @Author: Leo 
 * @Date: 2017-11-30 14:59:15 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-30 15:25:56
 */

var _tm = require("util/tm.js");

var _address = {
    // 获取地址列表
    getAddressList: function (resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/shipping/list.do"),
            dada: {pageSize: 50},
            success: resolve,
            error: reject
        });
    },
    
};

module.exports = _address;