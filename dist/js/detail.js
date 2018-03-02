webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(108);


/***/ }),

/***/ 7:
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

/***/ 8:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 14:
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

/***/ 15:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 17:
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

/***/ 18:
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

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-11-28 15:40:44 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-11-29 10:19:13
	 */

	__webpack_require__(109);
	__webpack_require__(14);
	__webpack_require__(7);

	var _tm           = __webpack_require__(10);
	var _product      = __webpack_require__(111);
	var _cart         = __webpack_require__(18);
	var templateIndex = __webpack_require__(112);

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
	        // 图片预览
	        $(document).on('mouseenter', '.p-img-item', function () {
	            var imageUrl = $(this).find('.p-img').attr('src');
	            $(".main-img").attr("src", imageUrl);
	        });
	        // 加减数量
	        $(document).on('click', '.p-count-btn', function () {
	            var type      = $(this).hasClass("plus") ? "plus" : "minus",
	                $pCount   = $(".p-count"),
	                currCount = parseInt($pCount.val()),
	                minCount   = 1,
	                maxCount  = _this.data.detailInfo.stock || 1;
	            if (type === 'plus') {
	                $pCount.val(currCount < maxCount ? (currCount + 1) : maxCount);
	            } else if (type === "minus") {
	                $pCount.val(currCount > minCount ? (currCount - 1) : minCount);
	            }
	        });
	        // 加入购物车
	        $(document).on('click', '.cart-add', function () {
	            _cart.addToCart({
	                productId : _this.data.productId,
	                count     : $('.p-count').val()
	            }, function(res){
	                window.location.href = './result.html?type=cart-add';
	            }, function(errMsg){
	                _tm.errorTips(errMsg);
	            });
	        });
	    },

	    // 加载商品详情
	    loadDetail : function () {
	        var _this = this,
	            html = '',
	            $pageWrap = $('.page-wrap');
	        // 加载动画
	        $pageWrap.html('<div class="loading"></div>');
	        // 请求detail信息
	        _product.getProductDetial(this.data.productId, function (res) {
	            _this.data.detailInfo = res;
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
	});

/***/ }),

/***/ 109:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-11-27 20:16:27 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-11-28 23:30:44
	 */

	var _tm = __webpack_require__(10);

	var _product = {
	    // 获取商品列表
	    getProductList : function(listParam, resolve, reject) {
	        _tm.request({
	            url     : _tm.getServerUrl("/product/list.do"),
	            data    : listParam,
	            success : resolve,
	            error   : reject
	        });
	    },
	    // 获取商品详细信息
	    getProductDetial: function (productId, resolve, reject) {
	      _tm.request({
				url: _tm.getServerUrl("/product/detail.do"),
			  data: {productId: productId},
				success: resolve,
				error: reject
	      });
	    },
	};

	module.exports = _product;

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

	module.exports = "<div class=\"intro-wrap\">\r\n    <div class=\"p-img-con\">\r\n        <div class=\"main-img-con\">\r\n            <img class=\"main-img\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\">\r\n        </div>\r\n        <ul class=\"p-img-list\">\r\n            {{#subImages}}\r\n            <li class=\"p-img-item\">\r\n                <img class=\"p-img\" src=\"{{imageHost}}{{.}}\" alt=\"{{name}}\">\r\n            </li>\r\n             {{/subImages}}\r\n        </ul>\r\n    </div>\r\n    <div class=\"p-info-con\">\r\n        <h1 class=\"p-name\">{{name}}</h1>\r\n        <p class=\"p-subtitle\">{{subtitle}}</p>\r\n        <div class=\"p-info-item p-price-con\">\r\n            <span class=\"label\">价格:</span>\r\n            <span class=\"info\">￥{{price}}</span>\r\n        </div>\r\n        <div class=\"p-info-item\">\r\n            <span class=\"label\">库存:</span>\r\n            <span class=\"info\">{{stock}}</span>\r\n        </div>\r\n        <div class=\"p-info-item p-count-con\">\r\n            <span class=\"label\">数量:</span>\r\n            <input class=\"p-count\" value=\"1\" readonly=\"\" />\r\n            <span class=\"p-count-btn plus\">+</span>\r\n            <span class=\"p-count-btn minus\">-</span>\r\n        </div>\r\n        <div class=\"p-info-item\">\r\n            <a class=\"btn cart-add\">加入购物车</a>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"detail-wrap\">\r\n    <div class=\"detail-tab-con\">\r\n        <ul class=\"tab-list\">\r\n            <li class=\"tab-item active\">详细描述</li>\r\n        </ul>\r\n    </div>\r\n    <div class=\"detail-con\">\r\n        {{{detail}}}\r\n    </div>\r\n</div>";

/***/ })

});