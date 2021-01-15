"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _page["default"])({
  data: {
    container: null,
    scrollTop: 0,
    offsetTop: 0
  },
  onReady: function onReady() {
    this.setData({
      container: function container() {
        return wx.createSelectorQuery().select("#container");
      }
    });
  },
  onScroll: function onScroll(event) {
    var _this = this;

    wx.createSelectorQuery().select("#scroller").boundingClientRect(function (res) {
      _this.setData({
        scrollTop: event.detail.scrollTop,
        offsetTop: res.top
      });
    }).exec();
  }
});