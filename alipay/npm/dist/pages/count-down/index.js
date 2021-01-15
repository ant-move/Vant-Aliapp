"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    time: 30 * 60 * 60 * 1000,
    timeData: {}
  },
  onChange: function onChange(e) {
    this.setData({
      timeData: e.detail
    });
  },
  start: function start() {
    var countDown = this.selectComponent(".control-count-down");
    countDown.start();
  },
  pause: function pause() {
    var countDown = this.selectComponent(".control-count-down");
    countDown.pause();
  },
  reset: function reset() {
    var countDown = this.selectComponent(".control-count-down");
    countDown.reset();
  },
  finished: function finished() {
    (0, _toast["default"])("倒计时结束");
  }
});