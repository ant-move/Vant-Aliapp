"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _page["default"])({
  data: {
    tabs2: [1, 2],
    tabs3: [1, 2, 3],
    tabs4: [1, 2, 3, 4],
    tabs6: [1, 2, 3, 4, 5, 6],
    tabsWithName: [{
      name: "a",
      index: 1
    }, {
      name: "b",
      index: 2
    }, {
      name: "c",
      index: 3
    }]
  },
  onClickDisabled: function onClickDisabled(event) {
    wx.showToast({
      title: "\u6807\u7B7E ".concat(event.detail.index + 1, " \u5DF2\u88AB\u7981\u7528"),
      icon: "none"
    });
  },
  onChange: function onChange(event) {
    wx.showToast({
      title: "\u5207\u6362\u5230\u6807\u7B7E ".concat(event.detail.index + 1),
      icon: "none"
    });
  },
  onClickNavRight: function onClickNavRight() {
    wx.showToast({
      title: "点击 right nav",
      icon: "none"
    });
  },
  onClick: function onClick(event) {
    wx.showToast({
      title: "\u70B9\u51FB\u6807\u7B7E ".concat(event.detail.index + 1),
      icon: "none"
    });
  }
});