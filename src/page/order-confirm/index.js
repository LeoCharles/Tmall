/*
 * @Author: Leo 
 * @Date: 2017-11-30 10:29:42 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-30 16:22:22
 */

require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");

var _tm             = require("util/tm.js");
var _order          = require("service/order-service.js");
var _address        = require("service/address-service.js");
var templateAddress = require("./address-list.string");
var templateProduct = require("./product-list.string");

var page = {
    data: {
        selectedAddressId: null
    },

    init: function () {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function () {
        this.loadAddressList();
        this.loadProductList();
    },

    bindEvent: function () {
        var _this = this;
        // 选择收货地址
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        // 添加收货地址
        $(document).on('click', '.address-add', function () {

        });
        // 订单提交
        $(document).on('click', '.order-submit', function () {
            var shippingId = _this.data.selectedAddressId;
            if (shippingId) {
                _order.createOrder({
                    shippingId:shippingId
                }, function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function (errMsg) {
                    _tm.errorTips(errMsg);
                });
            } else {
                _tm.errorTips('请选择地址后再提交');
            }

        });
    },

    // 加载收货地址
    loadAddressList: function () {
        var _this = this;
        // 获取地址列表
        _address.getAddressList(function (res) {  
            var addressListHtml = _tm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function (errMsg) {
            $('.address-con').html('<div class="err-tip">地址加载失败，请刷新后重试</div>');
        });
    },

    // 加载商品清单
    loadProductList: function () {
        var _this = this;
        // 获取商品列表
        _order.getProductList(function (res) {
            var productListHtml = _tm.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function (errMsg) {
            $('.product-con').html('<div class="err-tip">商品信息加载失败，请刷新后重试</div>');
        });
    },
};

$(function () {
    page.init();
});