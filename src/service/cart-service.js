/*
 * @Author: leofe 
 * @Date: 2017-10-26 22:43:22 
 * @Last Modified by: leofe
 * @Last Modified time: 2017-10-26 22:45:19
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
};

module.exports = _cart;

