"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _page["default"])({
  data: {
    show1: false,
    show2: false,
    show3: false
  },
  onLoad: function onLoad() {
    this.setData({
      actions: [{
        name: "选项"
      }, {
        name: "分享",
        subname: "描述信息",
        openType: "share"
      }, {
        loading: true
      }, {
        name: "禁用选项",
        disabled: true
      }]
    });
  },
  toggle: function toggle(type) {
    this.setData(_defineProperty({}, type, !this.data[type]));
  },
  toggleActionSheet1: function toggleActionSheet1() {
    this.toggle("show1");
  },
  toggleActionSheet2: function toggleActionSheet2() {
    this.toggle("show2");
  },
  toggleActionSheet3: function toggleActionSheet3() {
    this.toggle("show3");
  }
});