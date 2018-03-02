webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(154);


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

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: leofe 
	 * @Date: 2017-10-27 00:00:14 
	 * @Last Modified by: leofe
	 * @Last Modified time: 2017-10-31 22:40:07
	 */

	__webpack_require__(121);
	var _tm           = __webpack_require__(10);
	var templateIndex = __webpack_require__(123);

	// 侧边导航
	var navSide = {
	    // 默认值
	    option : {
	        name : '',
	        navList : [
	            {name : 'user-center', desc : '个人中心', href : './user-center.html'},
	            {name : 'order-list', desc : '我的订单', href : './order-list.html'},
	            {name : 'user-pass-update', desc : '修改密码', href : './user-pass-update.html'},
	            {name : 'about', desc : '关于TMall', href : './about.html'}
	        ]
	    },
	    // 初始化
	    init : function (option) {
	        // 合并选项
	        $.extend(this.option, option);
	        this.renderNav();
	    },
	    // 渲染左侧导航
	    renderNav : function () {
	        // 计算active数据
	        for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
	            if (this.option.navList[i].name === this.option.name) {
	                this.option.navList[i].isActive = true;
	            }
	        }
	        // 渲染list数据
	        var navHtml = _tm.renderHtml(templateIndex, {
	            navList : this.option.navList
	        });
	        // 把html放入容器
	        $('.nav-side').html(navHtml);
	    }
	};

	module.exports = navSide;

/***/ }),

/***/ 121:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

	module.exports = "{{# navList}}\r\n    {{# isActive}}\r\n    <li class=\"nav-item active\">\r\n    {{/ isActive}}\r\n    {{^ isActive}}\r\n    <li class=\"nav-item\">\r\n    {{/ isActive}}\r\n        <a href=\"{{ href }}\" class=\"link\">{{ desc }}</a>\r\n    </li>\r\n{{/ navList}}";

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-11-28 10:41:17 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-11-28 14:15:31
	 */

	__webpack_require__(135);
	var templatePagination = __webpack_require__(137);
	var _tm = __webpack_require__(10);

	var Pagination = function () {
	    var _this = this;
	    // 默认选项
	    this.defaultOption = {
	        container    : null,
	        pageNum      : 1,
	        pageRange    : 3,
	        onSelectPage : null
	    };
	    // 事件代理
	    $(document).on('click', '.page-item', function () {
	        var $this = $(this);
	        // 过滤按钮disabled和active状态
	        if ($this.hasClass('active') || $this.hasClass('disabled')) {
	            return;
	        }
	        typeof _this.option.onSelectPage === 'function' ? 
	            _this.option.onSelectPage($this.data('value')) : null;
	    });
	};

	// 渲染分页组件
	Pagination.prototype.render = function (userOption) {
	    //  合并选项
	    this.option = $.extend({}, this.defaultOption, userOption);
	    // 判断容器是否为合法的jQuery对象
	    if(!(this.option.container instanceof jQuery)) {
	        return;
	    }
	    // 判断是否只有1页
	    if (this.option.pages <= 1) {
	        return;
	    }
	    // 渲染分页
	    this.option.container.html(this.getPaginationHtml());
	};

	// 获取分页的html  |上一页| 2 3 4 =5= 6 7 8 |下一页| 5/9 
	Pagination.prototype.getPaginationHtml = function () {
	    var html      = '',
	        option    = this.option,
	        pageArray = [],
	        start     = (option.pageNum - option.pageRange) > 0 ? (option.pageNum - option.pageRange) : 1,
	        end       = (option.pageNum + option.pageRange) < option.pages ? (option.pageNum + option.pageRange) : option.pages;
	    // 上一页按钮
	    pageArray.push({
	        name: '上一页',
	        value: option.prePage,
	        disable: !option.hasPreviousPage
	    });
	    // 数字按钮
	    for(var i = start; i <= end; i++) {
	        pageArray.push({
	            name: i,
	            value: i,
	            active : i === option.pageNum
	        });
	    }
	    // 下一页按钮
	    pageArray.push({
	        name: '下一页',
	        value: option.nextPage,
	        disable: !option.hasNextPage
	    });
	    // 获取html模版
	    html = _tm.renderHtml(templatePagination, {
	        pageArray : pageArray,
	        pageNum   : option.pageNum,
	        pages     : option.pages
	    });
	    return html;
	};

	module.exports = Pagination;

/***/ }),

/***/ 135:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 137:
/***/ (function(module, exports) {

	module.exports = "<div class=\"page-con\">\r\n    {{#pageArray}}\r\n    {{#disable}}\r\n        <span class=\"page-item disabled\" data-value=\"{{value}}\">{{name}}</span>\r\n    {{/disable}}\r\n    {{^disable}}\r\n        {{#active}}\r\n            <span class=\"page-item active\" data-value=\"{{value}}\">{{name}}</span>\r\n        {{/active}}\r\n        {{^active}}\r\n        <span class=\"page-item\" data-value=\"{{value}}\">{{name}}</span>\r\n        {{/active}}\r\n    {{/disable}}\r\n    {{/pageArray}}\r\n    <span class=\"page-total\">第 {{pageNum}} 页 / 共 {{pages}} 页</span>\r\n</div>";

/***/ }),

/***/ 141:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-11-30 11:02:13 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-12-02 23:40:16
	 */

	var _tm = __webpack_require__(10);

	var _order = {
	    // 创建订单
	    createOrder: function (orderInfo, resolve, reject) {  
	        _tm.request({
	            url: _tm.getServerUrl("/order/create.do"),
	            data: orderInfo,
	            success: resolve,
	            error: reject
	        });
	    },
	    // 获取订单列表
	    getOrderList : function (listParam, resolve, reject) {
	        _tm.request({
	            url: _tm.getServerUrl("/order/list.do"),
	            data: listParam,
	            success: resolve,
	            error: reject
	        });
	    },
	    // 获取订单详情
	    getOrderDetail : function (orderNumber, resolve, reject) {
	        _tm.request({
	            url: _tm.getServerUrl("/order/detail.do"),
	            data: {orderNo : orderNumber},
	            success: resolve,
	            error: reject
	        });
	    },
	    // 取消订单
	    cancelOrder : function (orderNumber, resolve, reject) {
	        _tm.request({
	            url: _tm.getServerUrl("/order/cancel.do"),
	            data: {orderNo : orderNumber},
	            success: resolve,
	            error: reject
	        });
	    },
	    // 获取商品列表
	    getProductList: function (resolve, reject) {
	        _tm.request({
	            url: _tm.getServerUrl("/order/get_order_cart_product.do"),
	            success: resolve,
	            error: reject
	        });
	    },
	};

	module.exports = _order;

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-12-01 16:18:44 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-12-02 21:39:07
	 */

	__webpack_require__(155);
	__webpack_require__(14);
	__webpack_require__(7);

	var navSide       = __webpack_require__(120);
	var _tm           = __webpack_require__(10);
	var _order        = __webpack_require__(141);
	var templateIndex = __webpack_require__(157);
	var Pagination    = __webpack_require__(134);

	var page = {
	    data : {
	        listParam : {
	            pageNum  : 1,
	            pageSize : 10
	        }
	    },

	    // 初始化
	    init: function () {
	        this.onLoad();
	    },

	    // 页面加载
	    onLoad : function () {
	        // 初始化左侧菜单
	        navSide.init({
	            name: 'order-list'
	        });
	        // 初始化订单列表
	        this.loadOrderList();
	    },

	    // 加载订单列表
	    loadOrderList : function() {
	        var _this         = this,
	            orderListHtml = '',
	            $listCon      = $('.order-list-con');
	        // 加载动画
	        $listCon.html('<div class="loading"></div>');
	        _order.getOrderList(this.data.listParam, function (res) {
	            orderListHtml = _tm.renderHtml(templateIndex, res);
	            $listCon.html(orderListHtml);
	            // 加载分页信息
	            _this.loadPagination({
	                hasPreviousPage: res.hasPreviousPage,
	                prePage: res.prePage,
	                hasNextPage: res.hasNextPage,
	                nextPage: res.nextPage,
	                pageNum: res.pageNum,
	                pages: res.pages
	            });
	        }, function (errMsg) {
	            $listCon.html('<div class="err-tip">加载订单失败， 请刷新后重试</div>');
	        });
	    },
	    
	    // 加载分页信息
	    loadPagination : function (pageInfo) {
	        var _this = this;
	        !this.pagination && (this.pagination = new Pagination());
	        this.pagination.render($.extend({}, pageInfo, {
	            container : $('.pagination'),
	            onSelectPage : function (pageNum) {
	                _this.data.listParam.pageNum = pageNum;
	                _this.loadOrderList();
	            }
	        }));
	    },

	};

	$(function () {
	    page.init();
	});


/***/ }),

/***/ 155:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

	module.exports = "<table class=\"order-list-table header\">\r\n    <tr>\r\n        <th class=\"cell cell-img\">&nbsp;</th>\r\n        <th class=\"cell cell-info\">商品信息</th>\r\n        <th class=\"cell cell-price\">单价</th>\r\n        <th class=\"cell cell-count\">数量</th>\r\n        <th class=\"cell cell-total\">小计</th>\r\n    </tr>\r\n</table> \r\n{{#list}}\r\n<table class=\"order-list-table order-item\">\r\n    <tr>\r\n        <td class=\"order-info\" colspan=\"5\">\r\n            <span class=\"order-text\">\r\n                <span>订单号：</span>\r\n                <a class=\"link order-num\" href=\"./order-detail.html?orderNumber={{orderNo}}\" target=\"_blank\">{{orderNo}}</a>\r\n            </span>\r\n            <span class=\"order-text\">{{createTime}}</span>\r\n            <span class=\"order-text\">收件人：{{receiverName}}</span>\r\n            <span class=\"order-text\">订单状态：{{statusDesc}}</span>\r\n            <span class=\"order-text\">订单总价：<span class=\"order-total\">￥{{payment}}</span></span>\r\n            <a class=\"link order-detail\" href=\"./order-detail.html?orderNumber={{orderNo}}\" target=\"_blank\">查看详情&gt;&gt;</a>\r\n        </td>\r\n    </tr>\r\n    {{#orderItemVoList}}\r\n    <tr>\r\n        <td class=\"cell cell-img\">\r\n            <a href=\"./order-detail.html?productId={{productId}}\" target=\"_blank\">\r\n<img src=\"{{imageHost}}{{productImage}}\" alt=\"{{productName}}\" class=\"p-img\">\r\n            </a>\r\n        </td>\r\n        <td class=\"cell cell-info\">\r\n            <a class=\"link\" href=\"./order-detail.html?productId={{productId}}\" target=\"_blank\">{{productName}}</a>\r\n        </td>\r\n        <td class=\"cell cell-price\">￥{{currentUnitPrice}}</td>\r\n        <td class=\"cell cell-count\">{{quantity}}</td>\r\n        <td class=\"cell cell-total\">￥{{totalPrice}}</td>\r\n    </tr>\r\n    {{/orderItemVoList}}\r\n</table>\r\n{{/list}}\r\n{{^list}}\r\n<div class=\"err-tip\">您暂时还没有订单</div>\r\n{{/list}}";

/***/ })

});