"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "pages/submit-bar/index"
  }
});
(0, _page["default"])({
  onClickButton: function onClickButton() {
    (0, _toast["default"])("点击按钮");
  },
  onClickLink: function onClickLink() {
    (0, _toast["default"])("修改地址");
  }
});