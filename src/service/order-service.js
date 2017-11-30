/*
 * @Author: Leo 
 * @Date: 2017-11-30 11:02:13 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-30 16:24:38
 */

var _tm = require("util/tm.js");

var _order = {
    // 获取商品列表
    getProductList: function (resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl("/order/get_order_cart_product.do"),
            success: resolve,
            error: reject
        });
    },
    // 创建订单
    createOrder: function (orderInfo, resolve, reject) {  
        _tm.request({
            url: _tm.getServerUrl("/order/create.do"),
            data: orderInfo,
            success: resolve,
            error: reject
        });
    },
};

module.exports = _order;