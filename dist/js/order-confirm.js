webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(138);


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

/***/ 138:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-11-30 10:29:42 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-12-03 23:31:58
	 */

	__webpack_require__(139);
	__webpack_require__(14);
	__webpack_require__(7);

	var _tm             = __webpack_require__(10);
	var _order          = __webpack_require__(141);
	var _address        = __webpack_require__(142);
	var addressModal    = __webpack_require__(143);
	var templateAddress = __webpack_require__(148);
	var templateProduct = __webpack_require__(149);

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
	                    window.location.href = './order-payment.html?orderNumber=' + res.orderNo;
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

/***/ }),

/***/ 139:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

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

/***/ 142:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-11-30 14:59:15 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-12-01 15:09:14
	 */

	var _tm = __webpack_require__(10);

	var _address = {
	    // 获取收货地址列表
	    getAddressList : function (resolve, reject) {
	        _tm.request({
	            url: _tm.getServerUrl("/shipping/list.do"),
	            data: {pageSize: 50},
	            success: resolve,
	            error: reject
	        });
	    },
	    // 获取某一个收货地址
	    getAddress: function (shippingId, resolve, reject) {
	        _tm.request({
	            url: _tm.getServerUrl("/shipping/select.do"),
	            data: {shippingId: shippingId },
	            success: resolve,
	            error: reject
	        });
	    },
	    // 添加新地址
	    saveAddress: function (addressInfo, resolve, reject) {
	        _tm.request({
	            url: _tm.getServerUrl("/shipping/add.do"),
	            data: addressInfo,
	            success: resolve,
	            error: reject
	        });
	    },
	    // 更新地址
	    updateAddress: function (addressInfo, resolve, reject) {
	        _tm.request({
	            url: _tm.getServerUrl("/shipping/update.do"),
	            data: addressInfo,
	            success: resolve,
	            error: reject
	        });
	    },
	    // 删除地址
	    deleteAddress: function (shippingId, resolve, reject) {
	        _tm.request({
	            url: _tm.getServerUrl("/shipping/del.do"),
	            data: {shippingId: shippingId},
	            success: resolve,
	            error: reject
	        });
	    },
	};

	module.exports = _address;

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-12-01 09:22:07 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-12-01 15:49:24
	 */

	__webpack_require__(144);

	var _tm                  = __webpack_require__(10);
	var _cities              = __webpack_require__(146);
	var _address             = __webpack_require__(142);
	var templateAddressModal = __webpack_require__(147);

	var addressModal = {
	    show : function (option) {
	        // 缓存模态框容器
	        this.$modalWrap = $('.modal-wrap');
	        // 绑定option选项
	        this.option = option;
	        // 防止取值时报错
	        this.option.data = option.data || {};
	        // 渲染页面
	        this.loadModal();
	        // 绑定事件
	        this.bindEvent();
	    },

	    // 关闭弹框
	    hide: function () {
	        this.$modalWrap.empty();
	    },

	    loadModal : function () {
	        var addressModalHtml = _tm.renderHtml(templateAddressModal, {
	            isUpdate : this.option.isUpdate,
	            data: this.option.data
	        });
	        this.$modalWrap.html(addressModalHtml);
	        // 加载省份
	        this.loadProvince();
	    },

	    bindEvent: function () {
	        var _this = this;
	        // 省份和城市的二级联动
	        this.$modalWrap.find('#receiverProvince').on('change', function () {
	            var selectedProvince = $(this).val();
	            _this.loadCities(selectedProvince);
	        });
	        // 提交收货地址
	        this.$modalWrap.find('.address-btn').on('click', function () {
	            var receiverInfo = _this.getReceiverInfo(),
	                isUpdate     = _this.option.isUpdate;
	            // 添加地址且验证通过
	            if (!isUpdate && receiverInfo.status) {
	                _address.saveAddress(receiverInfo.data, function (res) {
	                    _tm.successTips('地址添加成功');
	                    _this.hide();
	                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess();
	                }, function (errMsg) {
	                    _tm.errorTips(errMsg);
	                });
	            }
	            // 更新地址且验证通过
	            else if (isUpdate && receiverInfo.status) {
	                _address.updateAddress(receiverInfo.data, function (res) {
	                    _tm.successTips('地址修改成功');
	                    _this.hide();
	                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess();
	                }, function (errMsg) {
	                    _tm.errorTips(errMsg);
	                });
	            }
	            // 验证不通过
	            else {
	                _tm.errorTips(receiverInfo.errMsg || '好像哪里不对了~');
	            }
	        });
	        // 点击叉号或蒙板区关闭弹框(在叉号和蒙板上加close类名)
	        this.$modalWrap.find('.close').on('click', function () {
	            _this.hide();
	        });
	        // 点击modal内容区不关闭弹框，停止冒泡
	        this.$modalWrap.find('.modal-container').on('click', function (e) {
	            e.stopPropagation();
	        });
	    },

	    // 加载省份信息
	    loadProvince : function () {
	        var provinces       = _cities.getProvinces() || [],
	            $provinceSelect = this.$modalWrap.find('#receiverProvince');
	        $provinceSelect.html(this.getSelectOption(provinces));
	        // 如果是更新地址且有省份信息，做省份回填
	        if (this.option.isUpdate && this.option.data.receiverProvince) {
	            $provinceSelect.val(this.option.data.receiverProvince);
	            // 加载城市
	            this.loadCities(this.option.data.receiverProvince);
	        }
	    },

	    // 加载城市信息
	    loadCities : function (provinceName) {  
	        var cities      = _cities.getCities(provinceName) || [],
	            $citySelect = this.$modalWrap.find('#receiverCity');
	        $citySelect.html(this.getSelectOption(cities));
	        // 如果是更新地址且有城市信息，做城市回填
	        if (this.option.isUpdate && this.option.data.receiverCity) {
	            $citySelect.val(this.option.data.receiverCity);
	        }
	    },

	    // 获取选择框的选项，输入：array，输出：HTML
	    getSelectOption : function (optionArray) {
	        var html = '<option value="">请选择</option>';
	        for (var i = 0, length = optionArray.length; i < length; i++) {
	            html += '<option value="' + optionArray[i] +'">' + optionArray[i] +'</option>';
	        }
	        return html;
	    },

	    // 获取表单数据, 并验证
	    getReceiverInfo : function () {
	        var receiverInfo = {},
	            result = {
	                status: false
	            };
	        receiverInfo.receiverName     = $.trim(this.$modalWrap.find('#receiverName').val());
	        receiverInfo.receiverProvince = this.$modalWrap.find('#receiverProvince').val();
	        receiverInfo.receiverCity     = this.$modalWrap.find('#receiverCity').val();
	        receiverInfo.receiverAddress  = $.trim(this.$modalWrap.find('#receiverAddress').val());
	        receiverInfo.receiverMobile   = $.trim(this.$modalWrap.find('#receiverMobile').val());
	        receiverInfo.receiverZip      = $.trim(this.$modalWrap.find('#receiverZip').val());
	        // 如果是更新地址
	        if(this.option.isUpdate) {
	            receiverInfo.id = this.$modalWrap.find('#receiverId').val();
	        }
	        // 表单验证
	        if (!receiverInfo.receiverName) {
	            result.errMsg = '请输入收件人姓名';
	        } else if (!receiverInfo.receiverProvince) {
	            result.errMsg = '请选择收件人所在省份';
	        } else if (!receiverInfo.receiverCity) {
	            result.errMsg = '请选择收件人所在城市';
	        } else if (!receiverInfo.receiverAddress) {
	            result.errMsg = '请输入收件人详细地址';
	        } else if (!receiverInfo.receiverMobile) {
	            result.errMsg = '请输入收件人手机号';
	        } else {
	            result.status = true;
	            result.data   = receiverInfo;
	        }
	        return result;
	    },
	};

	module.exports = addressModal;


/***/ }),

/***/ 144:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 146:
/***/ (function(module, exports) {

	/*
	 * @Author: Leo 
	 * @Date: 2017-12-01 10:36:17 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-12-01 10:50:56
	 */

	var _cities = {
	    cityInfo: {
	        '北京': ['北京'],
	        '上海': ['上海'],
	        '天津': ['天津'],
	        '重庆': ['重庆'],
	        '河北省': ['石家庄', '张家口', '承德', '秦皇岛', '唐山', '廊坊', '保定', '沧州', '衡水', '邢台', '邯郸'],
	        '山西省': ['太原', '大同', '朔州', '阳泉', '长治', '晋城', '忻州', '吕梁', '晋中', '临汾', '运城'],
	        '辽宁省': ['沈阳', '朝阳', '阜新', '铁岭', '抚顺', '本溪', '辽阳', '鞍山', '丹东', '大连', '营口', '盘锦', '锦州', '葫芦岛'],
	        '吉林省': ['长春', '白城', '松原', '吉林', '四平', '辽源', '通化', '白山', '延边'],
	        '黑龙江省': ['哈尔滨', '齐齐哈尔', '黑河', '大庆', '伊春', '鹤岗', '佳木斯', '双鸭山', '七台河', '鸡西', '牡丹江', '绥化', '大兴安'],
	        '江苏省': ['南京', '徐州', '连云港', '宿迁', '淮阴', '盐城', '扬州', '泰州', '南通', '镇江', '常州', '无锡', '苏州'],
	        '浙江省': ['杭州', '湖州', '嘉兴', '舟山', '宁波', '绍兴', '金华', '台州', '温州', '丽水'],
	        '安徽省': ['合肥', '宿州', '淮北', '阜阳', '蚌埠', '淮南', '滁州', '马鞍山', '芜湖', '铜陵', '安庆', '黄山', '六安', '巢湖', '池州', '宣城'],
	        '福建省': ['福州', '南平', '三明', '莆田', '泉州', '厦门', '漳州', '龙岩', '宁德'],
	        '江西省': ['南昌', '九江', '景德镇', '鹰潭', '新余', '萍乡', '赣州', '上饶', '抚州', '宜春', '吉安'],
	        '山东省': ['济南', '聊城', '德州', '东营', '淄博', '潍坊', '烟台', '威海', '青岛', '日照', '临沂', '枣庄', '济宁', '泰安', '莱芜', '滨州', '菏泽'],
	        '河南省': ['郑州', '三门峡', '洛阳', '焦作', '新乡', '鹤壁', '安阳', '濮阳', '开封', '商丘', '许昌', '漯河', '平顶山', '南阳', '信阳', '周口', '驻马店'],
	        '湖北省': ['武汉', '十堰', '襄阳', '荆门', '孝感', '黄冈', '鄂州', '黄石', '咸宁', '荆州', '宜昌', '恩施', '襄樊'],
	        '湖南省': ['长沙', '张家界', '常德', '益阳', '岳阳', '株洲', '湘潭', '衡阳', '郴州', '永州', '邵阳', '怀化', '娄底', '湘西'],
	        '广东省': ['广州', '清远', '韶关', '河源', '梅州', '潮州', '汕头', '揭阳', '汕尾', '惠州', '东莞', '深圳', '珠海', '江门', '佛山', '肇庆', '云浮', '阳江', '茂名', '湛江'],
	        '海南省': ['海口', '三亚'],
	        '四川省': ['成都', '广元', '绵阳', '德阳', '南充', '广安', '遂宁', '内江', '乐山', '自贡', '泸州', '宜宾', '攀枝花', '巴中', '达川', '资阳', '眉山', '雅安', '阿坝', '甘孜', '凉山'],
	        '贵州省': ['贵阳', '六盘水', '遵义', '毕节', '铜仁', '安顺', '黔东南', '黔南', '黔西南'],
	        '云南省': ['昆明', '曲靖', '玉溪', '丽江', '昭通', '思茅', '临沧', '保山', '德宏', '怒江', '迪庆', '大理', '楚雄', '红河', '文山', '西双版纳'],
	        '陕西省': ['西安', '延安', '铜川', '渭南', '咸阳', '宝鸡', '汉中', '榆林', '商洛', '安康'],
	        '甘肃省': ['兰州', '嘉峪关', '金昌', '白银', '天水', '酒泉', '张掖', '武威', '庆阳', '平凉', '定西', '陇南', '临夏', '甘南'],
	        '青海省': ['西宁', '海东', '西宁', '海北', '海南', '黄南', '果洛', '玉树', '海西'],
	        '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '呼伦贝尔盟', '兴安盟', '哲里木盟', '锡林郭勒盟', '乌兰察布盟', '鄂尔多斯', '巴彦淖尔盟', '阿拉善盟'],
	        '广西': ['南宁', '桂林', '柳州', '梧州', '贵港', '玉林', '钦州', '北海', '防城港', '南宁', '百色', '河池', '柳州', '贺州'],
	        '西藏': ['拉萨', '那曲', '昌都', '林芝', '山南', '日喀则', '阿里'],
	        '宁夏': ['银川', '石嘴山', '吴忠', '固原'],
	        '新疆': ['乌鲁木齐', '克拉玛依', '喀什', '阿克苏', '和田', '吐鲁番', '哈密', '博尔塔拉', '昌吉', '巴音郭楞', '伊犁', '塔城', '阿勒泰'],
	        '香港': ['香港'],
	        '澳门': ['澳门'],
	        '台湾': ['台北', '台南', '其他']
	    },

	    // 获取所有省份
	    getProvinces : function () {
	        var provinces = [];
	        for (var item in this.cityInfo) {
	            provinces.push(item);
	        }
	        return provinces;
	    },

	    // 获取某省份的所有城市
	    getCities : function (provinceName) {
	        return this.cityInfo[provinceName] || [];
	    },
	};

	module.exports = _cities;

/***/ }),

/***/ 147:
/***/ (function(module, exports) {

	module.exports = "<div class=\"modal close\">\r\n    <div class=\"modal-container\">\r\n        <div class=\"modal-header\">\r\n            {{#isUpdate}}\r\n            <h1 class=\"modal-title\">更新地址</h1>\r\n            {{/isUpdate}}\r\n            {{^isUpdate}}\r\n            <h1 class=\"modal-title\">添加新地址</h1>\r\n            {{/isUpdate}}\r\n            <i class=\"fa fa-close close\"></i>\r\n        </div>\r\n        <div class=\"modal-body\">\r\n            <div class=\"form\">\r\n                <div class=\"form-line\">\r\n                    <label class=\"label\" for=\"receiverName\"><i class=\"require\">*</i>收件人姓名：</label>\r\n                    <input class=\"form-item\" type=\"text\" id=\"receiverName\" value=\"{{data.receiverName}}\" placeholder=\"请输入收件人姓名\"/>\r\n                </div>\r\n                <div class=\"form-line\">\r\n                    <label class=\"label\" for=\"receiverProvince\"><i class=\"require\">*</i>所在城市：</label>\r\n                    <select class=\"form-item\" id=\"receiverProvince\">\r\n                        <option value=\"\">请选择</option>\r\n                    </select>\r\n                    <select class=\"form-item\" id=\"receiverCity\">\r\n                        <option value=\"\">请选择</option>\r\n                    </select>\r\n                </div>\r\n                <div class=\"form-line\">\r\n                    <label class=\"label\" for=\"receiverAddress\"><i class=\"require\">*</i>详细地址：</label>\r\n                    <input class=\"form-item\" type=\"text\" id=\"receiverAddress\" value=\"{{data.receiverAddress}}\" placeholder=\"请精确到门牌号\" />\r\n                </div>\r\n                <div class=\"form-line\">\r\n                    <label class=\"label\" for=\"receiverMobile\"><i class=\"require\">*</i>收件人手机：</label>\r\n                    <input class=\"form-item\" type=\"text\" id=\"receiverMobile\" value=\"{{data.receiverMobile}}\" placeholder=\"请输入11位手机号\" />\r\n                </div>\r\n                <div class=\"form-line\">\r\n                    <label class=\"label\" for=\"receiverZip\">邮政编码：</label>\r\n                    <input class=\"form-item\" type=\"text\" id=\"receiverZip\" value=\"{{data.receiverZip}}\" placeholder=\"请输入邮政编码\" />\r\n                </div>\r\n                <div class=\"form-line\">\r\n                    <input type=\"hidden\" id=\"receiverId\" value=\"{{data.id}}\">\r\n                    <a class=\"btn address-btn\">保存收货地址</a>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

	module.exports = "{{#list}}\r\n{{#isActive}}\r\n<div class=\"address-item active\" data-id=\"{{id}}\">\r\n{{/isActive}}\r\n{{^isActive}}\r\n<div class=\"address-item\" data-id=\"{{id}}\">\r\n{{/isActive}}\r\n    <div class=\"address-title\">\r\n        {{receiverProvince}} {{receiverCity}} ( {{receiverName}} 收)\r\n    </div>\r\n    <div class=\"address-detail\">\r\n        {{receiverAddress}} {{receiverMobile}}\r\n    </div>\r\n    <div class=\"address-operation\">\r\n        <span class=\"link address-update\">编辑</span>\r\n        <span class=\"link address-delete\">删除</span>\r\n    </div>\r\n</div>\r\n{{/list}}\r\n<div class=\"address-add\">\r\n    <div class=\"address-new\">\r\n        <i class=\"fa fa-plus\"></i>\r\n        <div class=\"text\">添加新地址</div>\r\n    </div>\r\n</div>";

/***/ }),

/***/ 149:
/***/ (function(module, exports) {

	module.exports = "<table class=\"product-table\">\r\n    <tr>\r\n        <th class=\"cell-img\">&nbsp;</th>\r\n        <th class=\"cell-info\">商品描述</th>\r\n        <th class=\"cell-price\">价格</th>\r\n        <th class=\"cell-count\">数量</th>\r\n        <th class=\"cell-total\">小计</th>\r\n    </tr>\r\n    {{#orderItemVoList}}\r\n    <tr>\r\n        <td class=\"cell-img\">\r\n            <a href=\"./detail.html?productId={{productId}}\" target=\"_blank\">\r\n                <img class=\"p-img\" src=\"{{imageHost}}{{productImage}}\" alt=\"{{productName}}\" />\r\n            </a>\r\n        </td>\r\n        <td class=\"cell-info\">\r\n<a class=\"link\" href=\"./detail.html?productId={{productId}}\" target=\"_blank\">{{productName}}</a>\r\n        </td>\r\n        <td class=\"cell-price\">￥{{currentUnitPrice}}</td>\r\n        <td class=\"cell-count\">{{quantity}}</td>\r\n        <td class=\"cell-total\">￥{{totalPrice}}</td>\r\n    </tr>\r\n    {{/orderItemVoList}}\r\n</table>\r\n<div class=\"submit-con\">\r\n    <span class=\"text\">订单总价：</span>\r\n    <span class=\"submit-total\">￥{{productTotalPrice}}</span>\r\n    <span class=\"btn order-submit\">提交订单</span>\r\n</div>";

/***/ })

});