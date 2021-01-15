"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _notify = _interopRequireDefault(require("../../dist/notify/notify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  onChange: function onChange(event) {
    (0, _notify["default"])({
      type: "primary",
      message: "\u5207\u6362\u81F3\u7B2C".concat(event.detail, "\u9879")
    });
  }
});