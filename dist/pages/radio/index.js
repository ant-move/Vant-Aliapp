"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _page["default"])({
  data: {
    radio1: "1",
    radio2: "2",
    radio3: "1",
    icon: {
      normal: "https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png",
      active: "https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png"
    },
    list: ["1", "2", "3", "4"]
  },
  onChange: function onChange(event) {
    var key = event.currentTarget.dataset.key;
    this.setData(_defineProperty({}, key, event.detail));
  },
  onClick: function onClick(event) {
    var name = event.currentTarget.dataset.name;
    this.setData({
      radio3: name
    });
  }
});