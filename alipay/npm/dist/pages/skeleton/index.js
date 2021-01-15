"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    show: false
  },
  onChange: function onChange(_ref) {
    var detail = _ref.detail;
    this.setData({
      show: detail
    });
  }
});