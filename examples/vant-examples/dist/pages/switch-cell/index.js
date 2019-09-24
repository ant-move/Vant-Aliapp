"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    checked: true
  },
  onChange: function onChange(event) {
    this.setData({
      checked: event.detail
    });
  }
});