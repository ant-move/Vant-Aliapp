"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _notify = _interopRequireDefault(require("../../dist/notify/notify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  showNotify: function showNotify() {
    (0, _notify["default"])("通知内容");
  },
  showCustomColor: function showCustomColor() {
    (0, _notify["default"])({
      message: "自定义颜色",
      color: "#ad0000",
      background: "#ffe1e1"
    });
    setTimeout(_notify["default"].clear, 1000);
  },
  showCustomDuration: function showCustomDuration() {
    (0, _notify["default"])({
      duration: 1000,
      message: "自定义时长"
    });
  },
  showNotifyByType: function showNotifyByType(event) {
    var type = event.currentTarget.dataset.type;
    (0, _notify["default"])({
      type: type,
      message: "通知内容"
    });
  },
  showSafe: function showSafe() {
    (0, _notify["default"])({
      message: "通知内容",
      safeAreaInsetTop: true
    });
  }
});