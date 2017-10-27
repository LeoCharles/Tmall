/*
 * @Author: leofe 
 * @Date: 2017-10-27 21:53:08 
 * @Last Modified by: leofe
 * @Last Modified time: 2017-10-27 23:25:12
 */

require('./index.css');
require('page/common/nav-simple/index.js');
var _tm = require('util/tm.js');

$(function() {
    var type  = _tm.getUrlParam('type') || 'default',
        $elem = $('.' + type + '-success');
    // 显示对应的提示元素
    $elem.show();
});
