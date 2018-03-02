webpackJsonp([13],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(180);


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

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: leofe 
	 * @Date: 2017-10-25 22:51:45 
	 * @Last Modified by: leofe
	 * @Last Modified time: 2017-10-25 22:52:31
	 */
	__webpack_require__(167);

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 180:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: leofe 
	 * @Date: 2017-10-28 22:45:52 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-11-29 10:21:25
	 */

	__webpack_require__(181);
	__webpack_require__(166);
	var _tm   = __webpack_require__(10);
	var _user = __webpack_require__(17);

	// 表单的错误提示
	var formError = {
	    show : function(errMsg) {
	        $('.error-item').show().find('.err-msg').text(errMsg);
	    },
	    hide : function() {
	        $('.error-item').hide().find('.err-msg').text('');
	    }
	};

	var page = {
	    // 存储用户输入的数据
	    data : {
	        username : '',
	        question : '',
	        answer   : '',
	        token    : ''
	    },

	    // 初始化
	    init : function () {
	        this.onLoad();
	        this.bindEvent();
	    },

	    onLoad : function () {
	        this.loadStepUsername();
	    },

	    // 绑定事件
	    bindEvent : function () {
	        var _this = this;
	        // 输入用户名，下一步按钮的点击
	        $('#submit-username').on('click', function() {
	            var username = $.trim($('#username').val());
	            // 判断用户名是否为空
	            if (username) {
	                _user.getQuestion(username, function (res) {
	                    _this.data.username = username;
	                    _this.data.question = res;
	                    _this.loadStepQuestion();
	                }, function (errMsg) {
	                    formError.show(errMsg);
	                });
	            } else {
	                formError.show('请输入用户名');
	            }
	        });
	        // 输入密码提示问题答案，下一步按钮的点击
	        $('#submit-question').on('click', function() {
	            var answer = $.trim($('#answer').val());
	            // 判断密码提示问题答案是否为空
	            if (answer) {
	                // 检查密码提示问题答案
	                _user.checkAnswer({
	                    username : _this.data.username,
	                    question : _this.data.question,
	                    answer   : answer
	                }, function (res) {
	                    _this.data.answer = answer;
	                    _this.data.token  = res;
	                    _this.loadStepPassword();
	                }, function (errMsg) {
	                    formError.show(errMsg);
	                });
	            } else {
	                formError.show('请输入密码提示问题的答案');
	            }
	        });
	        // 输入新密码，下一步按钮的点击
	        $('#submit-password').on('click', function() {
	            var password = $.trim($('#password').val());
	            // 判断新密码是否为空
	            if (password && password.length >=6) {
	                // 检查密码提示问题答案
	                _user.resetPassword({
	                    username    : _this.data.username,
	                    passwordNew : password,
	                    forgetToken : _this.data.token
	                }, function (res) {
	                    window.location.href = './result.html?type=pass-reset';
	                    _this.loadStepPassword();
	                }, function (errMsg) {
	                    formError.show(errMsg);
	                });
	            } else {
	                formError.show('请输入不小于6位的新密码');
	            }
	        });
	    },

	    // 加载输入用户名的一步
	    loadStepUsername : function (){
	        $('.step-username').show();
	    },

	    // 加载输入密码提示问题答案的一步
	    loadStepQuestion : function (){
	        // 隐藏错误提示
	        formError.hide();
	        // 显示第二步
	        $('.step-username').hide()
	            .siblings('.step-question').show()
	            .find('.question').text(this.data.question);
	    },
	    
	    // 加载输入新密码一步
	    loadStepPassword : function (){
	        // 隐藏错误提示
	        formError.hide();
	        $('.step-question').hide()
	            .siblings('.step-password').show();
	    },

	};

	$(function () {
	    page.init();
	});

/***/ }),

/***/ 181:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});