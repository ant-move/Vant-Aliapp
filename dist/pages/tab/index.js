"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

(0, _page["default"])({
  data: {
    tabs: [1, 2, 3, 4],
    tabsMore: [1, 2, 3, 4, 5, 6, 7, 8]
  },
  onClickDisabled: function onClickDisabled(event) {
    _my.showToast({
      title: "\u6807\u7B7E ".concat(event.detail.index + 1, " \u5DF2\u88AB\u7981\u7528"),
      icon: "none"
    });
  },
  onChange: function onChange(event) {
    _my.showToast({
      title: "\u5207\u6362\u5230\u6807\u7B7E ".concat(event.detail.index + 1),
      icon: "none"
    });
  },
  onClickNavRight: function onClickNavRight() {
    _my.showToast({
      title: "点击 right nav",
      icon: "none"
    });
  },
  onClick: function onClick(event) {
    _my.showToast({
      title: "\u70B9\u51FB\u6807\u7B7E ".concat(event.detail.index + 1),
      icon: "none"
    });
  }
});