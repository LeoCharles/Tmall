/*
 * @Author: Leo 
 * @Date: 2017-11-28 15:40:44 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-28 18:33:40
 */

require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");

var _tm           = require("util/tm.js");
var _product      = require("service/product-service.js");
var _cart         = require("service/cart-service.js");
var templateIndex = require("./index.string");

var page = {
    data: {
        productId: _tm.getUrlParam('productId') || ''
    },

    init : function () {
        this.onLoad();
        this.bindEvent();
    },

    onLoad : function () {
        // 如果没有productId 跳转到首页
        if(!this.data.productId) {
            _tm.goHome();
        }
        this.loadDetail();
    },

    bindEvent : function () {
        var _this = this;
        // 

    },

    // 加载商品详情
    loadDetail: function () {
        var _this = this,
            html = '',
            $pageWrap = $('.page-wrap');
        // 加载动画
        $pageWrap.html('<div class="loading"></div>');
        // 请求detail信息
        _product.getProductDetial(this.data.productId, function (res) {
            _this.filter(res);
            html = _tm.renderHtml(templateIndex, res);
            $pageWrap.html(html);
        }, function (errMsg) {
            $pageWrap.html('<p class="err-tip">此商品太淘气，找不到了~</p>');
        });
    },

    // 过滤缩略图字符串数据，返回数组
    filter : function  (data) {
        data.subImages = data.subImages.split(',');
    }
};

$(function () {
    page.init();
})