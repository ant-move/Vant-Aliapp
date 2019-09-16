"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _dialog = _interopRequireDefault(require("../../dist/dialog/dialog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    checked: true,
    checked2: true
  },
  onChange: function onChange(_ref) {
    var detail = _ref.detail;
    this.setData({
      checked: detail
    });
  },
  onChange2: function onChange2(_ref2) {
    var _this = this;

    var detail = _ref2.detail;

    _dialog["default"].confirm({
      title: "提示",
      message: "是否切换开关？"
    }).then(function (res) {
      _this.setData({
        checked2: detail
      });
    });
  }
});