/*
 * @Author: leofe 
 * @Date: 2017-10-20 21:51:39 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-11-15 23:01:58
 */

require("./index.css");
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('util/slider/index.js');
var navSide        = require('page/common/nav-side/index.js');
var templateBanner = require('./banner.string');
var _tm            = require('util/tm.js');

$(function () {
    // 渲染banner
    var bannerHtml = _tm.renderHtml(templateBanner);
    $(".banner-con").html(bannerHtml);
    // 初始化banner
    var $slider = $('.banner').unslider({
        dots: true
    });
    // 前一张后一张
    $('.banner-con .banner-arrow').on('click', function () {
        var forward = $(this).hasClass('prev') ? 'prev' : 'next';
        $slider.data('unslider')[forward]();
    });
});




