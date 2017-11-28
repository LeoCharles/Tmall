/*
 * @Author: leofe 
 * @Date: 2017-10-26 22:43:22 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-28 23:27:44
 */

var _tm = require('util/tm.js');

var _cart = {
    // 获取购物车数量
    getCartCount : function (resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error   : reject
        });
    },
    // 添加到购物车
    addToCart : function (productInfo, resolve, reject) {
        _tm.request({
            url     : _tm.getServerUrl('/cart/add.do'),
            data    : productInfo,
            success : resolve,
            error   : reject
        });
    },
};

module.exports = _cart;

