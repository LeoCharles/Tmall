/*
 * @Author: Leo 
 * @Date: 2017-12-03 22:43:40 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-03 23:18:31
 */

var _tm = require("util/tm.js");

var _payment = {
    // 获取支付信息
    getPaymentInfo : function (orderNumber, resolve, reject) {
        _tm.request({
          url: _tm.getServerUrl("/order/pay.do"),
          data: {orderNo: orderNumber },
          success: resolve,
          error: reject
        });
    },

    // 获取支付状态
    getPaymentStatus : function (orderNumber, resolve, reject) {  
        _tm.request({
          url: _tm.getServerUrl("/order/query_order_pay_status.do"),
          data: {orderNo: orderNumber },
          success: resolve,
          error: reject
        });
    },

};

module.exports = _payment;