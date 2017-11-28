/*
 * @Author: Leo 
 * @Date: 2017-11-28 10:41:17 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-28 14:15:31
 */

require('./index.css');
var templatePagination = require('./index.string');
var _tm = require('util/tm.js');

var Pagination = function () {
    var _this = this;
    // 默认选项
    this.defaultOption = {
        container    : null,
        pageNum      : 1,
        pageRange    : 3,
        onSelectPage : null
    };
    // 事件代理
    $(document).on('click', '.page-item', function () {
        var $this = $(this);
        // 过滤按钮disabled和active状态
        if ($this.hasClass('active') || $this.hasClass('disabled')) {
            return;
        }
        typeof _this.option.onSelectPage === 'function' ? 
            _this.option.onSelectPage($this.data('value')) : null;
    });
};

// 渲染分页组件
Pagination.prototype.render = function (userOption) {
    //  合并选项
    this.option = $.extend({}, this.defaultOption, userOption);
    // 判断容器是否为合法的jQuery对象
    if(!(this.option.container instanceof jQuery)) {
        return;
    }
    // 判断是否只有1页
    if (this.option.pages <= 1) {
        return;
    }
    // 渲染分页
    this.option.container.html(this.getPaginationHtml());
};

// 获取分页的html  |上一页| 2 3 4 =5= 6 7 8 |下一页| 5/9 
Pagination.prototype.getPaginationHtml = function () {
    var html      = '',
        option    = this.option,
        pageArray = [],
        start     = (option.pageNum - option.pageRange) > 0 ? (option.pageNum - option.pageRange) : 1,
        end       = (option.pageNum + option.pageRange) < option.pages ? (option.pageNum + option.pageRange) : option.pages;
    // 上一页按钮
    pageArray.push({
        name: '上一页',
        value: option.prePage,
        disable: !option.hasPreviousPage
    });
    // 数字按钮
    for(var i = start; i <= end; i++) {
        pageArray.push({
            name: i,
            value: i,
            active : i === option.pageNum
        });
    }
    // 下一页按钮
    pageArray.push({
        name: '下一页',
        value: option.nextPage,
        disable: !option.hasNextPage
    });
    // 获取html模版
    html = _tm.renderHtml(templatePagination, {
        pageArray : pageArray,
        pageNum   : option.pageNum,
        pages     : option.pages
    });
    return html;
};

module.exports = Pagination;