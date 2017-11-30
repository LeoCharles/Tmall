/*
 * @Author: Leo 
 * @Date: 2017-11-27 20:12:28 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-30 14:46:15
 */
require("./index.css");
require("page/common/nav/index.js");
require("page/common/header/index.js");

var _tm           = require("util/tm.js");
var _product      = require("service/product-service.js");
var templateIndex = require("./index.string");
var Pagination    = require("util/pagination/index.js");

var page = {
    data: {
        listParam : {
            keyword    : _tm.getUrlParam('keyword')    || '',
            categoryId : _tm.getUrlParam('categoryId') || '',
            orderBy    : _tm.getUrlParam('orderBy')    || 'default',
            pageNum    : _tm.getUrlParam('pageNum')    || 1,
            pageSize   : _tm.getUrlParam('pageSize')   || 20
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