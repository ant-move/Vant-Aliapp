"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _dialog = _interopRequireDefault(require("../../dist/dialog/dialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var message = "代码是写出来给人看的，附带能在机器上运行";
(0, _page["default"])({
  data: {
    show: false
  },
  showCustomDialog: function showCustomDialog() {
    this.setData({
      show: true
    });
  },
  getUserInfo: function getUserInfo(event) {
    console.log(event.detail);
  },
  onClickThemeAlert: function onClickThemeAlert() {
    _dialog["default"].alert({
      title: "标题",
      theme: "round-button",
      message: message
    });
  },
  onClickThemeAlert2: function onClickThemeAlert2() {
    _dialog["default"].alert({
      theme: "round-button",
      message: message
    });
  },
  onClickAlert: function onClickAlert() {
    _dialog["default"].alert({
      title: "标题",
      message: message
    });
  },
  onClickAlert2: function onClickAlert2() {
    _dialog["default"].alert({
      message: message
    });
  },
  onClickConfirm: function onClickConfirm() {
    _dialog["default"].confirm({
      title: "标题",
      message: message
    });
  },
  onClickAsyncClose: function onClickAsyncClose() {
    var beforeClose = function beforeClose(action) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          if (action === "confirm") {
            resolve(true);
          } else {
            // 拦截取消操作
            resolve(false);
          }
        }, 1000);
      });
    };

    _dialog["default"].confirm({
      title: "标题",
      message: message,
      beforeClose: beforeClose
    });
  },
  onClose: function onClose() {
    this.setData({
      show: false
    });
  }
});