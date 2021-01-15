"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    value: 1
  },
  onChange: function onChange(event) {
    var _this = this;

    _toast["default"].loading({
      forbidClick: true
    });

    setTimeout(function () {
      _toast["default"].clear();

      _this.setData({
        value: event.detail
      });
    }, 500);
  }
});