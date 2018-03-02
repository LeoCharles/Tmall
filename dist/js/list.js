webpackJsonp([4],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(130);


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

/***/ 130:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-11-27 20:12:28 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-12-02 21:29:11
	 */
	__webpack_require__(131);
	__webpack_require__(14);
	__webpack_require__(7);

	var _tm           = __webpack_require__(10);
	var _product      = __webpack_require__(111);
	var templateIndex = __webpack_require__(133);
	var Pagination    = __webpack_require__(134);

	var page = {
	    data: {
	        listParam : {
	            keyword    : _tm.getUrlParam('keyword')    || '',
	            categoryId : _tm.getUrlParam('categoryId') || '',
	            orderBy    : _tm.getUrlParam('orderBy')    || 'default',
	            pageNum    : _tm.getUrlParam('pageNum')    || 1,
	            pageSize   : _tm.getUrlParam('pageSize')   || 1
	        }
	    },

	    init : function () {
	        this.onLoad();
	        this.bindEvent();
	    },

	    onLoad : function () {
	        this.loadList();
	    },

	    bindEvent : function () {
	        var _this = this;
	        // 排序点击事件
	        $('.sort-item').on('click', function(){
	            var $this = $(this);
	            // 点击默认排序/价格排序时回到第一页
	            _this.data.listParam.pageNum = 1;
	            // 判断默认排序/价格排序
	            if ($this.data('type') === 'default') {
	                // 已经是默认排序active样式
	                if ($this.hasClass('active')) {
	                    return;
	                } else {
	                    $this.addClass('active').siblings('.sort-item')
	                        .removeClass('active asc desc');
	                    _this.data.listParam.orderBy = 'default';
	                }
	            } else if ($this.data("type") === "price") {
	                $this.addClass('active').siblings('.sort-item')
	                        .removeClass('active asc desc');
	                // 判断升序/降序
	                if (!$this.hasClass('asc')) {
	                    $this.addClass("asc").removeClass('desc');
	                    _this.data.listParam.orderBy = "price_asc";
	                } else {
	                     $this.addClass("desc").removeClass('asc');
	                     _this.data.listParam.orderBy = "price_desc";
	                }
	            }
	            // 点击后加载商品列表
	            _this.loadList();
	        });
	    },

	    // 加载商品列表
	    loadList : function () {
	        var _this     = this,
	            listHtml  = '',
	            listParam = this.data.listParam,
	            $pListCon = $('.p-list-con');
	        // 加载动画
	        $pListCon.html('<div class="loading"></div>');
	        // categoryId和keyword只需传一个
	        listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
	         // 请求商品列表接口
	        _product.getProductList(listParam, function(res) {
	            listHtml = _tm.renderHtml(templateIndex, {
	                list: res.list
	            });
	            $pListCon.html(listHtml);
	            _this.loadPagination({
	                hasPreviousPage : res.hasPreviousPage,
	                prePage         : res.prePage,
	                hasNextPage     : res.hasNextPage,
	                nextPage        : res.nextPage,
	                pageNum         : res.pageNum,
	                pages           : res.pages
	            });
	        }, function(errMsg) {
	            _tm.errorTips(errMsg);
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
	                _this.loadList();
	            }
	        }));
	    },
	};

	$(function () {
	    page.init();
	});

/***/ }),

/***/ 131:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 133:
/***/ (function(module, exports) {

	module.exports = "{{#list}}\r\n    <li class=\"p-item\">\r\n        <div class=\"p-img-con\">\r\n            <a class=\"link\" href=\"./detail.html?productId={{id}}\" target=\"_blank\">\r\n                <img class=\"p-img\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\"/>\r\n            </a>\r\n        </div>\r\n        <div class=\"p-price-con\">\r\n            <span class=\"p-price\">￥{{price}}</span>\r\n        </div>\r\n        <div class=\"p-name-con\">\r\n            <a class=\"p-name\" href=\"./detail.html?productId={{id}}\" target=\"_blank\">{{name}}</a>\r\n        </div>\r\n    </li>\r\n{{/list}}\r\n{{^list}}\r\n    <p class=\"err-tip\">很抱歉，找不到您要的商品。</p>\r\n{{/list}}";

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

/***/ })

});