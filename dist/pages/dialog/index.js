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
  onClickAlert: function onClickAlert() {
    _dialog["default"].alert({
      title: "标题",
      message: message
    });
  },
  getUserInfo: function getUserInfo(event) {
    console.log(event.detail);
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
    _dialog["default"].confirm({
      title: "标题",
      message: message,
      asyncClose: true
    }).then(function () {
      setTimeout(function () {
        _dialog["default"].close();
      }, 1000);
    })["catch"](function () {
      _dialog["default"].close();
    });
  },
  onClose: function onClose(event) {
    this.setData({
      show: false
    });
  }
});