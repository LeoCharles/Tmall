/*
 * @Author: Leo 
 * @Date: 2017-11-30 10:29:42 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-01 16:16:45
 */

require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");

var _tm             = require("util/tm.js");
var _order          = require("service/order-service.js");
var _address        = require("service/address-service.js");
var addressModal    = require("./address-modal.js");
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
            // 添加选中样式
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            // 保存选中地址的id
            _this.data.selectedAddressId = $(this).data('id');
        });
        // 添加收货地址
        $(document).on('click', '.address-add', function () {
            // 调用弹框模块
            addressModal.show({
                isUpdate: false,
                onSuccess: function() {
                    _this.loadAddressList();
                }
            });
        });
        // 编辑收货地址
        $(document).on('click', '.address-update', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function (res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function () {
                        _this.loadAddressList();
                    }
                });
            }, function (errMsg) {
                _tm.errorTips(errMsg);
            });
        });
        // 删除收货地址
        $(document).on('click', '.address-delete', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if (window.confirm('确认要删除该地址吗？')) {
                _address.deleteAddress(shippingId, function (res) {
                    _this.loadAddressList();
                }, function (errMsg) {
                    _tm.errorTips(errMsg);
                });
            }
        });
        // 订单提交
        $(document).on('click', '.order-submit', function () {
            // 获取选择地址的id
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
        $('.address-con').html('<div class="loading"></div>');
        // 获取地址列表
        _address.getAddressList(function (res) {
            // 处理返回的数据
            _this.addressFilter(res);
            var addressListHtml = _tm.renderHtml(templateAddress, res);
            $('.address-con').html(addressListHtml);
        }, function (errMsg) {
            $('.address-con').html('<div class="err-tip">地址加载失败，请刷新后重试</div>');
        });
    },

    // 加载商品清单
    loadProductList: function () {
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');
        // 获取商品列表
        _order.getProductList(function (res) {
            var productListHtml = _tm.renderHtml(templateProduct, res);
            $('.product-con').html(productListHtml);
        }, function (errMsg) {
            $('.product-con').html('<div class="err-tip">商品信息加载失败，请刷新后重试</div>');
        });
    },

    // 处理返回的地址数据, 刷新地址列表时，记住已选中的状态
    addressFilter : function (data) {
        if (this.data.selectedAddressId) {
            var selectedAddressIdFlag = false;
            for (var i = 0, length = data.list.length; i < length; i++) {
                // 判断是否为选中的地址
                if (data.list[i].id === this.data.selectedAddressId) {
                    // 如果是选中的地址 添加标记位
                    data.list[i].isActive = true;
                    selectedAddressIdFlag = true;
                }
            }
            // 如果选择的地址不在列表，将其删除
            if (!selectedAddressIdFlag) {
                this.data.selectedAddressId = null;
            }
        }
    },
};

$(function () {
    page.init();
});