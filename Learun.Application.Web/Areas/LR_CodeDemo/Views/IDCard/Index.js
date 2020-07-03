﻿/* * 创建人：超级管理员
 * 日  期：2020-06-29 21:15
 * 描  述：身份证管理
 */
var refreshGirdData;

var F_PersonId = request('F_PersonId');
var F_IDCardNo = request('F_IDCardNo');
var F_UserName = request('F_UserName');
var F_ApplicantId = request('F_ApplicantId');
var ParentDisable = request('ParentDisable');


var bootstrap = function ($, learun) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            // 初始化左侧树形数据
            $('#dataTree').lrtree({
                url: top.$.rootUrl + '/LR_CodeDemo/IDCard/GetTree?PersonId=' + F_PersonId + "&ApplicantId=" + F_ApplicantId,
                nodeClick: function (item) {
                    if (!!item.value) {
                        F_PersonId = item.id;
                        F_UserName = item.text;
                        F_IDCardNo = item.value;
                        F_ApplicantId = item.parentid
                        page.search();
                    }
                    else {
                      
                        F_PersonId = "";
                        F_UserName = "";
                        F_IDCardNo = "";
                        F_ApplicantId = item.id
                        debugger
                        if (ParentDisable != "true")
                        {
                            page.search();
                        }
                    }
                   
                }
            });
            $('#multiple_condition_query').lrMultipleQuery(function (queryJson) {
                page.search(queryJson);
            }, 220, 400);
            $('#F_SafeguardType').lrDataItemSelect({ code: 'SafeguardType' });
            // 刷新
            $('#lr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#lr_add').on('click', function () {
                if (!!F_PersonId) {
                    learun.layerForm({
                        id: 'form',
                        title: '新增',
                        url: top.$.rootUrl + '/LR_CodeDemo/IDCard/Form?F_PersonId=' + F_PersonId + "&F_UserName=" + F_UserName + "&F_IDCardNo=" + F_IDCardNo,
                        width: 600,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                } else
                {
                    learun.alert.warning('请选择树形列表人员!');
                }

            });
            // 编辑
            $('#lr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_PersonId');
                if (learun.checkrow(keyValue)) {
                    learun.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/LR_CodeDemo/IDCard/Form?keyValue=' + keyValue,
                        width: 600,
                        height: 400,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#lr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_PersonId');
                if (learun.checkrow(keyValue)) {
                    learun.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            learun.deleteForm(top.$.rootUrl + '/LR_CodeDemo/IDCard/DeleteForm', { keyValue: keyValue }, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            // 打印
            $('#lr_print').on('click', function () {
                $('#gridtable').jqprintTable();
            });
        },
        // 初始化列表
        initGird: function () {
            $('#gridtable').lrAuthorizeJfGrid({
                url: top.$.rootUrl + '/LR_CodeDemo/IDCard/GetPageList',
                headData: [
                    { label: "姓名", name: "F_UserName", width: 100, align: "left" },
                    { label: "身份证号码", name: "F_IDCardNo", width: 100, align: "left" },
                    { label: "身份证发证日", name: "F_IssueDate", width: 100, align: "left" },
                    { label: "身份证失效日", name: "F_ExpirationDate", width: 100, align: "left" },
                    {
                        label: "身份证保管方式", name: "F_SafeguardType", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op, $cell) {
                            learun.clientdata.getAsync('dataItem', {
                                key: value,
                                code: 'SafeguardType',
                                callback: function (_data) {
                                    callback(_data.text);
                                }
                            });
                        }
                    },
                    { label: "入库登记日", name: "F_WarehouseDate", width: 100, align: "left" },
                    { label: "备注", name: "F_Description", width: 100, align: "left" },
                ],
                mainId: 'F_PersonId',
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            param.F_PersonId = F_PersonId;
            param.F_ApplicantId = F_ApplicantId;
            $('#gridtable').jfGridSet('reload', { queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    };
    page.init();
}
