﻿/* * 创建人：超级管理员
 * 日  期：2020-07-02 23:56
 * 描  述：个人资格证
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
                        if (ParentDisable != "true") {
                            page.search();
                        }
                    }

                }
            });

            $('#multiple_condition_query').lrMultipleQuery(function (queryJson) {
                page.search(queryJson);
            }, 220, 400);
            $('#F_CertType').lrDataItemSelect({ code: 'CertType' });
            $('#F_MajorType').lrDataItemSelect({ code: 'MajorType' });
            $('#F_CertStyle').lrDataItemSelect({ code: 'CertStyle' });
            $('#F_CertStatus').lrDataItemSelect({ code: 'CertStatus' });
            $('#F_PracticeStyle').lrDataItemSelect({ code: 'PracticeStyle' });
            $('#F_PracticeSealStyle').lrDataItemSelect({ code: 'PracticeSealStyle' });
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
                        url: top.$.rootUrl + '/LR_CodeDemo/Credentials/Form?F_PersonId=' + F_PersonId + "&F_UserName=" + F_UserName + "&F_IDCardNo=" + F_IDCardNo,
                        width: 800,
                        height: 500,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
                else {
                    learun.alert.warning('请选择树形列表人员!');
                }
            });
            // 编辑
            $('#lr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_CredentialsId');
                if (learun.checkrow(keyValue)) {
                    learun.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/LR_CodeDemo/Credentials/Form?keyValue=' + keyValue,
                        width: 800,
                        height: 500,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#lr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('F_CredentialsId');
                if (learun.checkrow(keyValue)) {
                    learun.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            learun.deleteForm(top.$.rootUrl + '/LR_CodeDemo/Credentials/DeleteForm', { keyValue: keyValue}, function () {
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
                url: top.$.rootUrl + '/LR_CodeDemo/Credentials/GetPageList',
                headData: [
                    { label: "姓名", name: "F_UserName", width: 100, align: "left" },
                    { label: "身份证号码", name: "F_IDCardNo", width: 100, align: "left" },
                    { label: "证书类型", name: "F_CertType", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'CertType',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    { label: "专业类型", name: "F_MajorType", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'MajorType',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    { label: "证书专业", name: "F_Major", width: 100, align: "left"},
                    { label: "发证机构", name: "F_CertOrganization", width: 100, align: "left"},
                    { label: "资格发证日", name: "F_CertDateBegin", width: 100, align: "left"},
                    { label: "资格失效日", name: "F_CertDateEnd", width: 100, align: "left"},
                    { label: "资格证形式", name: "F_CertStyle", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'CertStyle',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    { label: "库存状态", name: "F_CertStatus", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'CertStatus',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    { label: "执业证形式", name: "F_PracticeStyle", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'PracticeStyle',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    { label: "执业印章", name: "F_PracticeSealStyle", width: 100, align: "left",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'PracticeSealStyle',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    { label: "登记日期", name: "F_CheckInTime", width: 100, align: "left"},
                    { label: "备注", name: "F_Description", width: 100, align: "left"},
                ],
                mainId:'F_CredentialsId',
                isPage: true
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            param.F_PersonId = F_PersonId;
            param.F_ApplicantId = F_ApplicantId;
            $('#gridtable').jfGridSet('reload',{ queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    };
    page.init();
}
