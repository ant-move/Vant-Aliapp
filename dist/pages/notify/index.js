"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _notify = _interopRequireDefault(require("../../dist/notify/notify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

(0, _page["default"])({
  showNotify: function showNotify() {
    (0, _notify["default"])("通知内容");
  },
  showNotify2: function showNotify2() {
    (0, _notify["default"])({
      duration: 1000,
      text: "通知内容",
      selector: ".custom-selector",
      backgroundColor: "#1989fa",
      safeAreaInsetTop: true
    });
  },
  onClickLeft: function onClickLeft() {
    _my.navigateBack();
  }
});