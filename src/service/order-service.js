/*
 * @Author: Leo 
 * @Date: 2017-11-30 11:02:13 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-02 23:40:16
 */

var _tm = require("util/tm.js");

var _order = {
    // 创建订单
    createOrder: function (orderInfo, resolve, reject) {  
        _tm.request({
            url: _tm.getServerUrl("/order/create.do"),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
    // 获取订单列表
    getOrderList : function (listParam, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/order/list.do"),
            data: listParam,
            success: resolve,
            error: reject
        });
    },
    // 获取订单详情
    getOrderDetail : function (orderNumber, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/order/detail.do"),
            data: {orderNo : orderNumber},
            success: resolve,
            error: reject
        });
    },
    // 取消订单
    cancelOrder : function (orderNumber, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/order/cancel.do"),
            data: {orderNo : orderNumber},
            success: resolve,
            error: reject
        });
    },
    // 获取商品列表
    getProductList: function (resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/order/get_order_cart_product.do"),
            success: resolve,
            error: reject
        });
    },
};

module.exports = _order;