/*
 * @Author: Leo 
 * @Date: 2017-12-01 09:22:07 
 * @Last Modified by: Leo
 * @Last Modified time: 2017-12-01 15:49:24
 */

require("./address-modal.css");

var _tm                  = require("util/tm.js");
var _cities              = require("util/cities/index.js");
var _address             = require("service/address-service.js");
var templateAddressModal = require("./address-modal.string");

var addressModal = {
    show : function (option) {
        // 缓存模态框容器
        this.$modalWrap = $('.modal-wrap');
        // 绑定option选项
        this.option = option;
        // 防止取值时报错
        this.option.data = option.data || {};
        // 渲染页面
        this.loadModal();
        // 绑定事件
        this.bindEvent();
    },

    // 关闭弹框
    hide: function () {
        this.$modalWrap.empty();
    },

    loadModal : function () {
        var addressModalHtml = _tm.renderHtml(templateAddressModal, {
            isUpdate : this.option.isUpdate,
            data: this.option.data
        });
        this.$modalWrap.html(addressModalHtml);
        // 加载省份
        this.loadProvince();
    },

    bindEvent: function () {
        var _this = this;
        // 省份和城市的二级联动
        this.$modalWrap.find('#receiverProvince').on('change', function () {
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        // 提交收货地址
        this.$modalWrap.find('.address-btn').on('click', function () {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate     = _this.option.isUpdate;
            // 添加地址且验证通过
            if (!isUpdate && receiverInfo.status) {
                _address.saveAddress(receiverInfo.data, function (res) {
                    _tm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess();
                }, function (errMsg) {
                    _tm.errorTips(errMsg);
                });
            }
            // 更新地址且验证通过
            else if (isUpdate && receiverInfo.status) {
                _address.updateAddress(receiverInfo.data, function (res) {
                    _tm.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess();
                }, function (errMsg) {
                    _tm.errorTips(errMsg);
                });
            }
            // 验证不通过
            else {
                _tm.errorTips(receiverInfo.errMsg || '好像哪里不对了~');
            }
        });
        // 点击叉号或蒙板区关闭弹框(在叉号和蒙板上加close类名)
        this.$modalWrap.find('.close').on('click', function () {
            _this.hide();
        });
        // 点击modal内容区不关闭弹框，停止冒泡
        this.$modalWrap.find('.modal-container').on('click', function (e) {
            e.stopPropagation();
        });
    },

    // 加载省份信息
    loadProvince : function () {
        var provinces       = _cities.getProvinces() || [],
            $provinceSelect = this.$modalWrap.find('#receiverProvince');
        $provinceSelect.html(this.getSelectOption(provinces));
        // 如果是更新地址且有省份信息，做省份回填
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            $provinceSelect.val(this.option.data.receiverProvince);
            // 加载城市
            this.loadCities(this.option.data.receiverProvince);
        }
    },

    // 加载城市信息
    loadCities : function (provinceName) {  
        var cities      = _cities.getCities(provinceName) || [],
            $citySelect = this.$modalWrap.find('#receiverCity');
        $citySelect.html(this.getSelectOption(cities));
        // 如果是更新地址且有城市信息，做城市回填
        if (this.option.isUpdate && this.option.data.receiverCity) {
            $citySelect.val(this.option.data.receiverCity);
        }
    },

    // 获取选择框的选项，输入：array，输出：HTML
    getSelectOption : function (optionArray) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, length = optionArray.length; i < length; i++) {
            html += '<option value="' + optionArray[i] +'">' + optionArray[i] +'</option>';
        }
        return html;
    },

    // 获取表单数据, 并验证
    getReceiverInfo : function () {
        var receiverInfo = {},
            result = {
                status: false
            };
        receiverInfo.receiverName     = $.trim(this.$modalWrap.find('#receiverName').val());
        receiverInfo.receiverProvince = this.$modalWrap.find('#receiverProvince').val();
        receiverInfo.receiverCity     = this.$modalWrap.find('#receiverCity').val();
        receiverInfo.receiverAddress  = $.trim(this.$modalWrap.find('#receiverAddress').val());
        receiverInfo.receiverMobile   = $.trim(this.$modalWrap.find('#receiverMobile').val());
        receiverInfo.receiverZip      = $.trim(this.$modalWrap.find('#receiverZip').val());
        // 如果是更新地址
        if(this.option.isUpdate) {
            receiverInfo.id = this.$modalWrap.find('#receiverId').val();
        }
        // 表单验证
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请选择收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请选择收件人所在城市';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人详细地址';
        } else if (!receiverInfo.receiverMobile) {
            result.errMsg = '请输入收件人手机号';
        } else {
            result.status = true;
            result.data   = receiverInfo;
        }
        return result;
    },
};

module.exports = addressModal;
