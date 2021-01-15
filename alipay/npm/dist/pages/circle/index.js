"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var format = function format(rate) {
  return Math.min(Math.max(rate, 0), 100);
};

(0, _page["default"])({
  data: {
    value: 25,
    gradientColor: {
      "0%": "#ffd01e",
      "100%": "#ee0a24"
    }
  },
  run: function run(e) {
    var step = parseFloat(e.currentTarget.dataset.step);
    this.setData({
      value: format(this.data.value += step)
    });
  }
});