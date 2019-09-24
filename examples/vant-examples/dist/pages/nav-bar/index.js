"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

(0, _page["default"])({
  onClickLeft: function onClickLeft() {
    _my.showToast({
      title: "点击返回",
      icon: "none"
    });
  },
  onClickRight: function onClickRight() {
    _my.showToast({
      title: "点击按钮",
      icon: "none"
    });
  }
});