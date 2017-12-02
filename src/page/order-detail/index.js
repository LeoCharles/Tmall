/*
 * @Author: Leo 
 * @Date: 2017-12-02 21:59:44 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-02 23:48:20
 */

require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");

var navSide       = require("page/common/nav-side/index.js");
var _tm           = require("util/tm.js");
var _order        = require("service/order-service.js");
var templateIndex = require("./index.string");

var page = {
    data : {
        orderNumber : _tm.getUrlParam('orderNumber')
    },

    // 初始化
    init: function () {
        this.onLoad();
        this.bindEvent();
    },

    // 页面加载
    onLoad : function () {
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        // 加载订单详情
        this.loadOrderDetail();
    },

    // 绑定事件
    bindEvent : function () {
        var _this = this;
        $(document).on('click', '.order-cancel', function () {
            if (window.confirm('确定要取消该订单吗？')) {
                // 取消订单
                _order.cancelOrder(_this.data.orderNumber, function(res) {
                    _tm.successTips("该订单取消成功");
                    _this.loadOrderDetail();
                }, function(errMsg) {
                    _tm.errorTips(errMsg);
                });
            }
        });
    },

    // 加载订单详情
    loadOrderDetail : function() {
        var _this           = this,
            orderDetailHtml = '',
            $content        = $('.content');
        // 加载动画
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function (res) {
            // 处理数据
            _this.dataFilter(res);
            // 渲染模板
            orderDetailHtml = _tm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
        }, function (errMsg) {
            $content.html('<div class="err-tip">' + errMsg + "</div>");
        });
    },
    
    // 处理数据
    dataFilter : function (data) {
        // status：10 表示提交了订单还未支付
        data.needPay      = data.status == 10;
        data.isCancelable = data.status == 10;
    },

};

$(function () {
    page.init();
});