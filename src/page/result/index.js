/*
 * @Author: leofe 
 * @Date: 2017-10-27 21:53:08 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-03 23:25:56
 */

require('./index.css');
require('page/common/nav-simple/index.js');
var _tm = require('util/tm.js');

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
