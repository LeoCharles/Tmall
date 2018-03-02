webpackJsonp([9],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(163);


/***/ }),

/***/ 163:
/***/ (function(module, exports, __webpack_require__) {

	/*
	 * @Author: leofe 
	 * @Date: 2017-10-27 21:53:08 
	 * @Last Modified by: Leo
	 * @Last Modified time: 2017-12-03 23:25:56
	 */

	__webpack_require__(164);
	__webpack_require__(166);
	var _tm = __webpack_require__(10);

	$(function() {
	    var type     = _tm.getUrlParam('type') || 'default',
	        $element = $('.' + type + '-success');

	    if (type === 'payment') {
	        var orderNumber  = _tm.getUrlParam('orderNumber'),
	            $orderNumber = $element.find('.order-number');
	        $orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
	    }
	    // 显示对应的提示元素
	    $element.show();
	});


/***/ }),

/***/ 164:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

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

/***/ })

});