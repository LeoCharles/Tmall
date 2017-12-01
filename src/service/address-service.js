/*
 * @Author: Leo 
 * @Date: 2017-11-30 14:59:15 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-01 15:09:14
 */

var _tm = require("util/tm.js");

var _address = {
    // 获取收货地址列表
    getAddressList : function (resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/shipping/list.do"),
            data: {pageSize: 50},
            success: resolve,
            error: reject
        });
    },
    // 获取某一个收货地址
    getAddress: function (shippingId, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/shipping/select.do"),
            data: {shippingId: shippingId },
            success: resolve,
            error: reject
        });
    },
    // 添加新地址
    saveAddress: function (addressInfo, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/shipping/add.do"),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    // 更新地址
    updateAddress: function (addressInfo, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/shipping/update.do"),
            data: addressInfo,
            success: resolve,
            error: reject
        });
    },
    // 删除地址
    deleteAddress: function (shippingId, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/shipping/del.do"),
            data: {shippingId: shippingId},
            success: resolve,
            error: reject
        });
    },
};

module.exports = _address;