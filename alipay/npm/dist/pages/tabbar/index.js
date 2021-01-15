"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _page["default"])({
  data: {
    active: 0,
    active2: "home",
    active3: 0,
    active4: 0,
    active5: 0,
    active6: 0,
    icon: {
      normal: "https://img.yzcdn.cn/vant/user-inactive.png",
      active: "https://img.yzcdn.cn/vant/user-active.png"
    }
  },
  onChange: function onChange(event) {
    var key = event.currentTarget.dataset.key;
    this.setData(_defineProperty({}, key, event.detail));
  },
  handleChange: function handleChange(event) {
    var key = event.currentTarget.dataset.key;
    this.setData(_defineProperty({}, key, event.detail));
    wx.showToast({
      title: "\u70B9\u51FB\u6807\u7B7E ".concat(event.detail + 1),
      icon: "none"
    });
  }
});