webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-11-29 10:14:09 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-11-30 10:25:56
	 */


	__webpack_require__(2);
	__webpack_require__(7);

	var nav           = __webpack_require__(14);
	var _tm           = __webpack_require__(10);
	var _cart         = __webpack_require__(18);
	var templateIndex = __webpack_require__(19);

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
	            // 加减商品数量
	            if (type === 'plus') {
	                if (currCount >= maxCount) {
	                   _tm.errorTips('该商品数量已达到上限');
	                   return;
	                }
	                // 增加
	                newCount = currCount + 1;
	            } else if (type === 'minus') {
	                if (currCount <= minCount) {
	                    return;
	                }
	                // 减少
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
	                window.location.href = './order-confirm.html';
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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: leofe 
	 * @Date: 2017-10-26 23:11:55 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-11-27 22:54:22
	 */

	__webpack_require__(8);
	var _tm   = __webpack_require__(10);

	// 通用页面头部
	var header = {
	    // 初始化
	    init : function () {
	        this.onLoad();
	        this.bindEvent();
	    },
	    // keyword存在时回填
	    onLoad : function () {
	        var keyword = _tm.getUrlParam('keyword');
	        // keyword存在，则回填输入框
	        if(keyword) {
	            $("#search-input").val(keyword);
	        }
	    },
	    // 绑定事件
	    bindEvent : function () {
	        var _this = this;
	        // 点击提交
	        $('#search-btn').on('click', function () {
	            _this.searchSubmit();
	        });
	        // Enter按键提交
	        $('#search-input').on('keyup', function (e) {
	            // Enter键的 keyCode 是13
	            if (e.keyCode === 13) {
	                _this.searchSubmit();
	            }
	        });
	    },
	    // 搜索提交
	    searchSubmit : function () {
	        var keyword = $.trim($('#search-input').val());
	        if(keyword) {
	            window.location.href = './list.html?keyword=' + keyword;
	        } else {
	            _tm.goHome();
	        }
	    },
	};

	header.init();



/***/ }),
/* 8 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: leofe 
	 * @Date: 2017-10-26 21:48:39 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-11-29 09:55:18
	 */
	__webpack_require__(15);
	var _tm   = __webpack_require__(10);
	var _user = __webpack_require__(17);
	var _cart = __webpack_require__(18);

	var nav = {
	    // 初始化
	    init : function () {
	        this.bindEvent();
	        this.loadUserInfo();
	        this.loadCartCount();
	        return this;
	    },
	    // 绑定事件
	    bindEvent : function () {
	        // 登录
	        $('.js-login').on('click', function () {
	            _tm.doLogin();
	        });
	        // 注册
	        $('.js-register').on('click', function () {
	           window.location.href = './user-register.html';
	        });
	        // 退出
	        $('.js-logout').on('click', function () {
	            _user.logout(function(res) {
	                window.location.reload();
	            }, function (errMsg) {
	                _tm.errorTips(errMsg);
	            });
	         });
	    },
	    // 读取用户信息
	    loadUserInfo : function () {
	        _user.checkLogin(function(res) {
	            $('.user.not-login').hide().siblings('.user.login').show()
	                .find('.username').text(res.username);
	        }, function (errMsg) {
	           // do nothing
	        });
	    },
	    // 读取购物车数量
	    loadCartCount : function () {
	        _cart.getCartCount(function(res) {
	            $('.nav .cart-count').text(res || 0);
	        }, function (errMsg) {
	            $('.nav .cart-count').text(0);
	        });
	    },
	};

	module.exports = nav.init();













/***/ }),
/* 15 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: leofe 
	 * @Date: 2017-10-26 22:20:28 
	 * @Last Modified by: leofe
	 * @Last Modified time: 2017-10-31 22:52:10
	 */

	var _tm = __webpack_require__(10);

	var _user = {
	    // 用户登录
	   login : function (userInfo, resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/login.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 退出登录
	    logout : function (resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/logout.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 用户注册
	    register : function (userInfo, resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/register.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查登录状态
	    checkLogin : function (resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/get_user_info.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检测用户名是否存在
	    checkUsername : function (username, resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/check_valid.do'),
	            data    : {
	                type : 'username',
	                str  : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取密码提示问题
	    getQuestion : function (username, resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/forget_get_question.do'),
	            data    : {
	                username : username
	            },
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 检查密码提示问题答案
	    checkAnswer : function (userInfo, resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/forget_check_answer.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 重置密码
	    resetPassword : function (userInfo, resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/forget_reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取用户信息
	    getUserInfo : function (resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/get_information.do'),
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 更新用户信息
	    updateUserInfo : function (userInfo, resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/update_information.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 登录状态下修改密码
	    updatePassWord : function (userInfo, resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl('/user/reset_password.do'),
	            data    : userInfo,
	            method  : 'POST',
	            success : resolve,
	            error   : reject
	        });
	    },

	};

	module.exports = _user;












/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: leofe 
	 * @Date: 2017-10-26 22:43:22 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-11-30 11:03:08
	 */

	var _tm = __webpack_require__(10);

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



/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = "{{#notEmpty}}\r\n<div class=\"cart-header\">\r\n    <table class=\"cart-table\">\r\n        <tr>\r\n            <th class=\"cart-cell cell-check\">\r\n                <label class=\"cart-label\">\r\n                    {{#allChecked}}\r\n                    <input type=\"checkbox\" class=\"cart-select-all\" checked/>\r\n                    {{/allChecked}}\r\n                    {{^allChecked}}\r\n                    <input type=\"checkbox\" class=\"cart-select-all\"/>\r\n                    {{/allChecked}}\r\n                    <span>全选</span>\r\n                </label>\r\n            </th>\r\n            <th class=\"cart-cell cell-info\">商品信息</th>\r\n            <th class=\"cart-cell cell-price\">单价</th>\r\n            <th class=\"cart-cell cell-count\">数量</th>\r\n            <th class=\"cart-cell cell-total\">合计</th>\r\n            <th class=\"cart-cell cell-operation\">操作</th>\r\n        </tr>\r\n    </table>\r\n</div>\r\n<div class=\"cart-list\">\r\n    {{#cartProductVoList}}\r\n    <table class=\"cart-table\" data-product-id=\"{{productId}}\">\r\n        <tr>\r\n            <td class=\"cart-cell cell-check\">\r\n                <label class=\"cart-label\">\r\n                    {{#productChecked}}\r\n                    <input type=\"checkbox\" class=\"cart-select\" checked/>\r\n                    {{/productChecked}}\r\n                    {{^productChecked}}\r\n                    <input type=\"checkbox\" class=\"cart-select\"/>\r\n                    {{/productChecked}}\r\n                </label>\r\n            </td>\r\n            <td class=\"cart-cell cell-img\">\r\n                <a href=\"./detail.html?productId={{productId}}\">\r\n                    <img class=\"p-img\" src=\"{{imageHost}}{{productMainImage}}\" alt=\"{{productName}}\">\r\n                </a>\r\n            </td>\r\n            <td class=\"cart-cell cell-info\">\r\n                <a class=\"link\" href=\"./detail.html?productId={{productId}}\">{{productName}}</a>\r\n            </td>\r\n            <td class=\"cart-cell cell-price\">￥{{productPrice}}</td>\r\n            <td class=\"cart-cell cell-count\">\r\n                <span class=\"count-btn minus\">-</span>\r\n                <input class=\"count-input\" value=\"{{quantity}}\" data-max=\"{{productStock}}\"/>\r\n                <span class=\"count-btn plus\">+</span>\r\n            </td>\r\n            <td class=\"cart-cell cell-total\">￥{{productTotalPrice}}</td>\r\n            <td class=\"cart-cell cell-operation\">\r\n                <span class=\"link cart-delete\">删除</span>\r\n            </td>\r\n        </tr>\r\n    </table>\r\n    {{/cartProductVoList}}\r\n</div>\r\n<div class=\"cart-footer\">\r\n    <div class=\"select-con\">\r\n        <label>\r\n            {{#allChecked}}\r\n            <input type=\"checkbox\" class=\"cart-select-all\" checked/>\r\n            {{/allChecked}}\r\n            {{^allChecked}}\r\n            <input type=\"checkbox\" class=\"cart-select-all\" />\r\n            {{/allChecked}}\r\n            <span>全选</span>\r\n        </label>\r\n    </div>\r\n    <div class=\"delete-con\">\r\n        <span class=\"link delete-select\">\r\n            <i class=\"fa fa-trash-o\"></i>\r\n            <span>删除选中</span>\r\n        </span>\r\n    </div>\r\n    <div class=\"submit-con\">\r\n        <span>总价：</span>\r\n        <span class=\"submit-total\">￥{{cartTotalPrice}}</span>\r\n        <span class=\"btn btn-submit\">去结算</span>\r\n    </div>\r\n</div>\r\n{{/notEmpty}}\r\n{{^notEmpty}}\r\n<div class=\"err-tip\">\r\n    <span>您的购物车空空如也,</span>\r\n    <a href=\"./index.html\">立即去购物</a>\r\n</div>\r\n{{/notEmpty}}";

/***/ })
]);