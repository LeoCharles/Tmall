/*
 * @Author: leofe 
 * @Date: 2017-10-20 21:51:39 
 * @Last Modified by: leofe
 * @Last Modified time: 2017-10-23 23:34:36
 */


var _mt = require('util/mt.js');

// test
// _mt.request({
//     url: '/product/list.do?keyword=1',
//     success: function (res) {
//         console.log(res);
//     },
//     error: function (errMsg) {
//         console.log(errMsg);
//     }
// });

// console.log(_mt.getUrlParam('test'));

var html = '<div>{{ data }}</div>';
var data = {
    data: 'abc'
};
console.log(_mt.renderHtml(html, data));





