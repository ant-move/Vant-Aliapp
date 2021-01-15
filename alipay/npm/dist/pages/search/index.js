"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _page["default"])({
  data: {
    value: ""
  },
  onChange: function onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onSearch: function onSearch() {
    if (this.data.value) {
      wx.showToast({
        title: "搜索：" + this.data.value,
        icon: "none"
      });
    }
  },
  onClick: function onClick() {
    if (this.data.value) {
      wx.showToast({
        title: "搜索：" + this.data.value,
        icon: "none"
      });
    }
  },
  onCancel: function onCancel() {
    wx.showToast({
      title: "取消",
      icon: "none"
    });
  },
  onClear: function onClear() {
    wx.showToast({
      title: "清空",
      icon: "none"
    });
  },
  antmoveAction: function antmoveAction() {//执行时动态赋值，请勿删除
  }
});