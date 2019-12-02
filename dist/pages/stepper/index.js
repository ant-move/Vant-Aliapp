"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "pages/stepper/index"
  }
});
(0, _page["default"])({
  onChange: function onChange(event) {
    (0, _toast["default"])("change: ".concat(event.detail));
  }
});