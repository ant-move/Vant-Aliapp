"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _page["default"])({
  data: {
    checkbox1: true,
    checkbox2: true,
    checkbox3: true,
    checkboxLabel: true,
    checkboxSize: true,
    checkboxShape: true,
    list: ["a", "b", "c"],
    result: ["a", "b"],
    result2: [],
    result3: [],
    activeIcon: "https://img.yzcdn.cn/vant/user-active.png",
    inactiveIcon: "https://img.yzcdn.cn/vant/user-inactive.png"
  },
  onChange: function onChange(event) {
    var key = event.currentTarget.dataset.key;
    this.setData(_defineProperty({}, key, event.detail));
  },
  onClick: function onClick(event) {
    var value = event.currentTarget.dataset.value;
    this.setData({
      radio3: value
    });
  },
  toggle: function toggle(event) {
    var index = event.currentTarget.dataset.index;
    var checkbox = this.selectComponent(".checkboxes-".concat(index));
    checkbox.toggle();
  },
  noop: function noop() {},
  antmoveAction: function antmoveAction() {//执行时动态赋值，请勿删除
  }
});