webpackJsonp([15],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(186);


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

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: leofe 
	 * @Date: 2017-10-28 20:56:15 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-11-29 10:22:47
	 */

	__webpack_require__(187);
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
	    // 初始化
	    init : function () {
	        this.bindEvent();
	    },

	    // 绑定事件
	    bindEvent : function () {
	        var _this = this;
	        // 验证username
	        $('#username').on('blur', function () {
	            var username = $.trim($(this).val());
	            // 用户名为空，不做验证
	            if (!username) return;
	            // 异步验证用户名是否存在
	            _user.checkUsername(username, function (res) {
	                formError.hide();
	            }, function (errMsg) {
	                formError.show(errMsg);
	            });
	        });
	        // 点击注册按钮提交
	        $('#submit').on('click', function() {
	            _this.submit();
	        });
	        // 按Enter键提交
	        $('.user-content').on('keyup', function(e) {
	            if(e.keyCode === 13) {
	                _this.submit();
	            }
	        });
	    },

	    // 提交表单
	    submit : function () {
	        var formData = {
	            username        : $.trim($('#username').val()),
	            password        : $.trim($('#password').val()),
	            passwordConfirm : $.trim($('#password-confirm').val()),
	            phone           : $.trim($('#phone').val()),
	            email           : $.trim($('#email').val()),
	            question        : $.trim($('#question').val()),
	            answer          : $.trim($('#answer').val()),
	        },
	        // 表单验证结果
	        validateResult = this.formValidate(formData);
	        if (validateResult.status) {
	            // 验证成功，提交
	            _user.register(formData, function (res) {
	                window.location.href = './result.html?type=register';
	            }, function (errMsg) {
	                formError.show(errMsg);
	            });
	        } else {
	            // 验证失败，提示
	            formError.show(validateResult.msg);
	        }
	    },
	    
	    // 表单验证
	    formValidate : function (formData) {
	        var result = {
	            status : false,
	            msg    : ''
	        };
	        if (!_tm.validate(formData.username, 'require')) {
	            result.msg = '用户名不能为空！';
	            return result;
	        }
	        if (!_tm.validate(formData.password, 'require')) {
	            result.msg = '密码不能为空！';
	            return result;
	        }
	        if (formData.password.length < 6) {
	            result.msg = '密码长度不能少于6位！';
	            return result;
	        }
	        if (formData.password !== formData.passwordConfirm) {
	            result.msg = '两次输入的密码不一致！';
	            return result;
	        }
	        if (!_tm.validate(formData.phone, 'phone')) {
	            result.msg = '手机号格式不正确！';
	            return result;
	        }
	        if (!_tm.validate(formData.email, 'email')) {
	            result.msg = '邮箱格式不正确！';
	            return result;
	        }
	        if (!_tm.validate(formData.question, 'require')) {
	            result.msg = '密码提示问题不能为空！';
	            return result;
	        }
	        if (!_tm.validate(formData.answer, 'require')) {
	            result.msg = '密码提示问题的答案不能为空！';
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

/***/ 187:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});