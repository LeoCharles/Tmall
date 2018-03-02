webpackJsonp([14],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(183);


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

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: leofe 
	 * @Date: 2017-10-31 21:51:36 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-11-29 10:21:42
	 */

	__webpack_require__(184);
	__webpack_require__(14);
	__webpack_require__(7);
	var navSide = __webpack_require__(120);
	var _tm     = __webpack_require__(10);
	var _user   = __webpack_require__(17);

	var page = {
	    // 初始化
	    init : function () {
	        this.onLoad();
	        this.bindEvent();
	    },

	    bindEvent : function () {
	        var _this = this;
	        // 点击提交按钮
	        $(document).on('click', '.btn-submit', function () {
	            var userInfo = {
	                password        : $.trim($('#password').val()),
	                passwordNew     : $.trim($('#password-new').val()),
	                passwordConfirm : $.trim($('#password-confirm').val())
	            };
	            validateResult = _this.validateForm(userInfo);
	            if (validateResult.status) {
	                // 更改用户密码
	                _user.updatePassWord({
	                    passwordOld : userInfo.password,
	                    passwordNew : userInfo.passwordNew
	                }, function (res, msg) {
	                    _tm.successTips(msg);
	                }, function (errMsg) {
	                    _tm.errorTips(errMsg);
	                });
	            } else {
	                _tm.errorTips(validateResult.msg);
	            }
	        });
	    },

	    // 页面加载
	    onLoad : function () {
	        // 初始化左侧菜单
	        navSide.init( {
	            name : 'user-pass-update'
	        });
	    },
	    
	    // 验证字段信息
	    validateForm : function (formData) {
	        var result = {
	            status : false,
	            msg    : ''
	        };
	        // 原密码是否为空
	        if (!_tm.validate(formData.password, 'require')) {
	            result.msg = '原密码不能为空！';
	            return result;
	        }
	        // 验证新密码长度
	        if (!formData.passwordNew || formData.passwordNew.length < 6) {
	            result.msg = '密码长度不能少于6位！';
	            return result;
	        }
	        // 验证两次密码是否一致
	        if (formData.passwordNew !== formData.passwordConfirm) {
	            result.msg = '两次输入的密码不一致！';
	            return result;
	        }
	        // 通过验证， 返回正确提示
	        result.status = true;
	        result.msg    = '验证通过！';
	        return result;
	    },
	};

	$(function () {
	    page.init();
	});

/***/ }),

/***/ 184:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});