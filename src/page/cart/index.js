/*
 * @Author: Leo 
 * @Date: 2017-11-29 10:14:09 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-29 23:26:14
 */


require("./index.css");
require("page/common/header/index.js");

var nav           = require("page/common/nav/index.js");
var _tm           = require("util/tm.js");
var _cart         = require("service/cart-service.js");
var templateIndex = require("./index.string");

var page = {
    data : {
        cartInfo : null
    },

    init : function () {
        this.onLoad();
        this.bindEvent();
    },

    onLoad : function () {
        this.loadCart();
    },

    bindEvent : function () {
        var _this = this;
        // 商品的选择/取消选择
        $(document).on('click', '.cart-select', function () {
            var $this     = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            // 切换选中状态
            if ($this.is(':checked')) {
                _cart.selectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            } else {
                _cart.unselectProduct(productId, function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
        });
        // 全选/取消全选
        $(document).on('click', '.cart-select-all', function () {
            var $this = $(this);
            // 切换选中状态
            if ($this.is(':checked')) {
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            } else {
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res);
                }, function (errMsg) {
                    _this.showCartError();
                });
            }
        });
        // 加减商品数量
        $(document).on('click', '.count-btn', function () {
            var $this     = $(this),
                $pCount   = $this.siblings('.count-input'),
                currCount = parseInt($pCount.val()),
                type      = $this.hasClass('plus') ? 'plus' : 'minus',
                productId = $this.parents('.cart-table').data('product-id'),
                minCount  = 1,
                maxCount  = parseInt($pCount.data('max')),
                newCount  = 0;
            // 切换选中状态
            if (type === 'plus') {
                if (currCount >= maxCount) {
                   _tm.errorTips('该商品数量已达到上限');
                   return;
                }
                // 累加
                newCount = currCount + 1;
            } else if (type === 'minus') {
                if (currCount <= minCount) {
                    return;
                }
                // 累减
                newCount = currCount - 1;
            }
            // 更新购物车商品数量
            _cart.updateProduct({
                productId: productId,
                count: newCount
            }, function (res) {
                _this.renderCart(res);
            }, function (errMsg) {
                _this.showCartError();
            });
        });
        // 删除单个商品
        $(document).on('click', '.cart-delete', function () {
            if(window.confirm('确认要删除该商品吗？')) {
                var productId = $(this).parents('.cart-table').data('product-id');
                _this.deleteCartProduct(productId);
            }
        });
        // 删除选中商品
        $(document).on('click', '.delete-select', function () {
            if (window.confirm('确认要删除选中商品吗？')) {
                var productIdsArr = [],
                    $selectedItem = $('.cart-select:checked');
                $selectedItem.each(function (idx, item) {
                    productIdsArr.push($(item).parents('.cart-table').data('product-id'));
                });
                if (productIdsArr.length) {
                    _this.deleteCartProduct(productIdsArr.join(','));
                } else {
                    _tm.errorTips('您还没有选中要删除的商品');
                }
            }
        });
        // 去结算
        $(document).on('click', '.btn-submit', function () {
            // 总价大于0，进行提交
            if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
                window.location.href = './confirm.html';
            } else {
                _tm.errorTips('请选择商品后再提交');
            }
        });
    },

    // 加载购物车信息
    loadCart : function () {
        var _this     = this,
            $pageWrap = $('.page-wrap');
        $pageWrap.html('<div class="loading"></div>');
        // 获取购物车列表
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    },

    // 数据过滤
    filter : function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },

    // 渲染购物车
    renderCart : function (data) {
        this.filter(data);
        // 缓存购物车信息
        this.data.cartInfo = data;
        //  生成html
        var cartHtml = _tm.renderHtml(templateIndex, data);
        $('.page-wrap').html(cartHtml);
        // 更新顶部导航栏购物车数量
        nav.loadCartCount();
    },

    // 删除指定商品，支持批量删除，productId用逗号分隔
    deleteCartProduct: function (productIds) {
        var _this = this;
        _cart.deleteProduct(productIds, function (res) {
            _this.renderCart(res);
        }, function (errMsg) {
            _this.showCartError();
        });
    },

    // 显示错误信息
    showCartError : function () {
        $('.page-wrap').html('<div class="err-tip">哪里不对了，刷新下试试~</div>');
    },
};

$(function () {
    page.init();
});