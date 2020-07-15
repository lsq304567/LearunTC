﻿/* * 创建人：超级管理员
 * 日  期：2020-07-10 18:11
 * 描  述：项目详情
 */
var refreshGirdData;
var bootstrap = function ($, learun) {
    "use strict";
    var page = {
        init: function () {
            page.initGird();
            page.bind();
        },
        bind: function () {
            $('#multiple_condition_query').lrMultipleQuery(function (queryJson) {
                page.search(queryJson);
            }, 220, 400);
            // 刷新
            $('#lr_refresh').on('click', function () {
                location.reload();
            });
            // 新增
            $('#lr_add').on('click', function () {
                learun.layerForm({
                    id: 'form',
                    title: '新增',
                    url: top.$.rootUrl + '/LR_CodeDemo/ProjectDetail/Form',
                    width: 750,
                    height: 450,
                    callBack: function (id) {
                        return top[id].acceptClick(refreshGirdData);
                    }
                });
            });
            // 编辑
            $('#lr_edit').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('ProjectDetailId');
                if (learun.checkrow(keyValue)) {
                    learun.layerForm({
                        id: 'form',
                        title: '编辑',
                        url: top.$.rootUrl + '/LR_CodeDemo/ProjectDetail/Form?keyValue=' + keyValue,
                        width: 750,
                        height: 450,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
                        }
                    });
                }
            });
            // 删除
            $('#lr_delete').on('click', function () {
                var keyValue = $('#gridtable').jfGridValue('ProjectDetailId');
                if (learun.checkrow(keyValue)) {
                    learun.layerConfirm('是否确认删除该项！', function (res) {
                        if (res) {
                            learun.deleteForm(top.$.rootUrl + '/LR_CodeDemo/ProjectDetail/DeleteForm', { keyValue: keyValue}, function () {
                                refreshGirdData();
                            });
                        }
                    });
                }
            });
            //人员分配
            $("#lr_addperson").on('click', function () {
                debugger
                var ProjectDetailId = $('#gridtable').jfGridValue('ProjectDetailId');
                var ProjectId = $('#gridtable').jfGridValue('ProjectId');
                if (learun.checkrow(ProjectDetailId)) {
                    learun.layerForm({
                        id: 'form',
                        title: '人员分配',
                        url: top.$.rootUrl + '/LR_CodeDemo/Credentials/AllocationIndex?ProjectDetailId=' + ProjectDetailId + "&ProjectId=" + ProjectId,
                        width: 1000,
                        height: 800,
                        callBack: function (id) {
                            return top[id].acceptClick(refreshGirdData);
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
                url: top.$.rootUrl + '/LR_CodeDemo/ProjectDetail/GetPageList',
                headData: [
                    {
                        label: "证书类型", name: "CertType", width: 100, align: "center",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'CertType',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    { label: "证书专业", name: "CertMajor", width: 100, align: "center"},
                    { label: "标准数量", name: "StandardNum", width: 100, align: "right"},
                    {
                        label: "社保要求", name: "SocialSecurityRequire", width: 100, align: "center",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'SocialSecurityRequire',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    {
                        label: "资格证要求", name: "CertRequire", width: 100, align: "center",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'CertRequire',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    {
                        label: "身份证要求", name: "IDCardRequire", width: 100, align: "center",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'CertRequire',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    {
                        label: "毕业证要求", name: "GradCertRequire", width: 100, align: "center",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'CertRequire',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    {
                        label: "到场要求", name: "SceneRequire", width: 100, align: "center",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'SceneRequire',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    { label: "其他要求", name: "OtherRequire", width: 100, align: "center"},
                    { label: "甲方提供数量", name: "AlreadyNum", width: 100, align: "right"},
                    { label: "我方配置数量", name: "NeedNum", width: 100, align: "right"},
                    {
                        label: "配置状态", name: "Status", width: 100, align: "center",
                        formatterAsync: function (callback, value, row, op,$cell) {
                             learun.clientdata.getAsync('dataItem', {
                                 key: value,
                                 code: 'CurrentCertStatus',
                                 callback: function (_data) {
                                     callback(_data.text);
                                 }
                             });
                        }},
                    { label: "配置说明", name: "F_Description", width: 100, align: "left"},
                ],
                mainId:'ProjectDetailId',
                isPage: true,

                 isSubGrid: true,
                subGridExpanded: function (subid, rowdata) {
                    $('#' + subid).jfGrid({
                        url: top.$.rootUrl + '/LR_CodeDemo/Relation/GetRelationDetail',
                        headData: [
                            { label: "姓名", name: "F_UserName", width: 100, align: "center" },
                            { label: "身份证号码", name: "F_IDCardNo", width: 150, align: "center" },
                            {
                                label: "证书类型", name: "F_CertType", width: 100, align: "center",
                                formatterAsync: function (callback, value, row, op, $cell) {
                                    learun.clientdata.getAsync('dataItem', {
                                        key: value,
                                        code: 'CertType',
                                        callback: function (_data) {
                                            callback(_data.text);
                                        }
                                    });
                                }
                            },
                            {
                                label: "专业序列", name: "F_MajorType", width: 100, align: "center",
                                formatterAsync: function (callback, value, row, op, $cell) {
                                    learun.clientdata.getAsync('dataItem', {
                                        key: value,
                                        code: 'MajorType',
                                        callback: function (_data) {
                                            callback(_data.text);
                                        }
                                    });
                                }
                            },
                            { label: "证书专业", name: "F_Major", width: 100, align: "center" },
                            { label: "发证机构", name: "F_CertOrganization", width: 100, align: "center" },
                            {
                                label: "资格发证日", name: "F_CertDateBegin", width: 100, align: "center",
                                formatter: function (cellvalue, row) {
                                    return learun.formatDate(cellvalue, 'yyyy-MM-dd');
                                }
                            },
                            {
                                label: "资格失效日", name: "F_CertDateEnd", width: 100, align: "center",
                                formatter: function (cellvalue, row) {
                                    return learun.formatDate(cellvalue, 'yyyy-MM-dd');
                                }
                            },
                            {
                                label: "资格证保管", name: "F_CertStyle", width: 100, align: "center",
                                formatterAsync: function (callback, value, row, op, $cell) {
                                    learun.clientdata.getAsync('dataItem', {
                                        key: value,
                                        code: 'CertStyle',
                                        callback: function (_data) {
                                            callback(_data.text);
                                        }
                                    });
                                }
                            },
                            {
                                label: "库存状态", name: "F_CertStatus", width: 100, align: "center",
                                formatterAsync: function (callback, value, row, op, $cell) {
                                    learun.clientdata.getAsync('dataItem', {
                                        key: value,
                                        code: 'CertStatus',
                                        callback: function (_data) {
                                            callback(_data.text);
                                        }
                                    });
                                }
                            },
                            {
                                label: "执业证", name: "F_PracticeStyle", width: 100, align: "center",
                                formatterAsync: function (callback, value, row, op, $cell) {
                                    learun.clientdata.getAsync('dataItem', {
                                        key: value,
                                        code: 'PracticeStyle',
                                        callback: function (_data) {
                                            callback(_data.text);
                                        }
                                    });
                                }
                            },
                            {
                                label: "执业印章", name: "F_PracticeSealStyle", width: 100, align: "center",
                                formatterAsync: function (callback, value, row, op, $cell) {
                                    learun.clientdata.getAsync('dataItem', {
                                        key: value,
                                        code: 'PracticeSealStyle',
                                        callback: function (_data) {
                                            callback(_data.text);
                                        }
                                    });
                                }
                            },
                            {
                                label: "登记日期", name: "F_CheckInTime", width: 100, align: "center",
                                formatter: function (cellvalue, row) {
                                    return learun.formatDate(cellvalue, 'yyyy-MM-dd');
                                }
                            },
                            { label: "备注", name: "F_Description", width: 100, align: "left" },
                        ]
                    });
                    $('#' + subid).jfGridSet('reload', { param: { ProjectDetailId: rowdata.ProjectDetailId } });
                }
            });
            page.search();
        },
        search: function (param) {
            param = param || {};
            $('#gridtable').jfGridSet('reload',{ queryJson: JSON.stringify(param) });
        }
    };
    refreshGirdData = function () {
        $('#gridtable').jfGridSet('reload');
    };
    page.init();
}