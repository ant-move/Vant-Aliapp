"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    show: false,
    showEmbedded: false
  },
  onClickShow: function onClickShow() {
    this.setData({
      show: true
    });
  },
  onClickHide: function onClickHide() {
    this.setData({
      show: false
    });
  },
  onClickShowEmbedded: function onClickShowEmbedded() {
    this.setData({
      showEmbedded: true
    });
  },
  onClickHideEmbedded: function onClickHideEmbedded() {
    this.setData({
      showEmbedded: false
    });
  },
  noop: function noop() {},
  antmoveAction: function antmoveAction() {//执行时动态赋值，请勿删除
  }
});