"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

(0, _page["default"])({
  onChange: function onChange(event) {
    _my.showToast({
      icon: "none",
      title: "\u5207\u6362\u81F3\u7B2C".concat(event.detail, "\u9879")
    });
  }
});