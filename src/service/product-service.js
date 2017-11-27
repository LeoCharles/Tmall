/*
 * @Author: Leo 
 * @Date: 2017-11-27 20:16:27 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-27 22:06:57
 */

var _tm = require("util/tm.js");

var _product = {
  // 获取商品列表
  getProductList: function(listParam, resolve, reject) {
    _tm.request({
      url     : _tm.getServerUrl("/product/list.do"),
      data    : listParam,
      success : resolve,
      error   : reject
    });
  }
};

module.exports = _product;