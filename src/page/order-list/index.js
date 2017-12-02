/*
 * @Author: Leo 
 * @Date: 2017-12-01 16:18:44 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-02 21:39:07
 */

require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var navSide       = require('page/common/nav-side/index.js');
var _tm           = require('util/tm.js');
var _order        = require('service/order-service.js');
var templateIndex = require('./index.string');
var Pagination    = require("util/pagination/index.js");

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
