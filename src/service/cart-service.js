/*
 * @Author: leofe 
 * @Date: 2017-10-26 22:43:22 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-30 11:03:08
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
    // 获取购物车列表
    getCartList : function (resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        });
    },
    // 选择购物车商品
    selectProduct : function (productId, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl('/cart/select.do'),
            data: {productId: productId},
            success: resolve,
            error: reject
        });
    },
    // 取消选择购物车商品
    unselectProduct : function (productId, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl('/cart/un_select.do'),
            data: { productId: productId },
            success: resolve,
            error: reject
        });
    },
    // 全选
    selectAllProduct : function ( resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 取消全选
    unselectAllProduct : function (resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        });
    },
    // 更新购物车商品数量
    updateProduct : function (productInfo, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        });
    },
    // 删除购物车商品
    deleteProduct : function (productIds, resolve, reject) {
        _tm.request({
            url: _tm.getServerUrl('/cart/delete_product.do'),
            data: {productIds: productIds},
            success: resolve,
            error: reject
        });
    }
};

module.exports = _cart;

