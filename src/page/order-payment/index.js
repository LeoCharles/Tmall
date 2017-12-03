/*
 * @Author: Leo 
 * @Date: 2017-12-03 21:54:19 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-03 23:16:43
 */

require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");

var _tm           = require("util/tm.js");
var _payment      = require("service/payment-service.js");
var templateIndex = require("./index.string");

var page = {
    data : {
        orderNumber : _tm.getUrlParam('orderNumber')
    },

    // 初始化
    init: function () {
        this.onLoad();
    },

    // 页面加载
    onLoad : function () {
        // 加载订单详情
        this.loadPaymentInfo();
    },


    // 加载订单详情
    loadPaymentInfo : function() {
        var _this       = this,
            payMentHtml = '',
            $pageWrap   = $('.page-wrap');
        // 加载动画
        $pageWrap.html('<div class="loading"></div>');
        _payment.getPaymentInfo(this.data.orderNumber, function(res) {
            // 渲染模板
            payMentHtml = _tm.renderHtml(templateIndex, res);
            $pageWrap.html(payMentHtml);
            // 监听订单状态
            _this.listenOrderStatus();
        }, function(errMsg) {
            $pageWrap.html('<div class="err-tip">' + errMsg + "</div>");
        });
    },
    
    // 监听订单状态
    listenOrderStatus : function () {
        var _this = this;
        // 开定时器，每5秒轮询一次
        this.paymentTimer = window.setInterval(function () {
            // 查询状态
            _payment.getPaymentStatus(_this.data.orderNumber, function (res) {
                if(res == true) {
                    window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
                }
            }, function (errMsg) {

            });
        }, 5e3);
    },

};

$(function () {
    page.init();
});
