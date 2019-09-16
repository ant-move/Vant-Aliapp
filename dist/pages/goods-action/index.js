"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  onClickIcon: function onClickIcon() {
    // wx.showToast({ title: '点击图标', icon: 'none' });
    (0, _toast["default"])("点击图标");
  },
  onClickButton: function onClickButton() {
    //wx.showToast({ title: '点击按钮', icon: 'none' });
    (0, _toast["default"])("点击按钮");
  }
});