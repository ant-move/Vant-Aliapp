"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _page["default"])({
  data: {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    show5: false,
    show6: false,
    action1: [{
      name: "选项"
    }, {
      name: "选项"
    }, {
      name: "选项",
      subname: "描述信息"
    }],
    action2: [{
      name: "着色选项",
      color: "#ee0a24"
    }, {
      loading: true
    }, {
      name: "禁用选项",
      disabled: true
    }],
    action6: [{
      name: "获取用户信息",
      color: "#07c160",
      openType: "getUserInfo"
    }]
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
  },
  toggleActionSheet4: function toggleActionSheet4() {
    this.toggle("show4");
  },
  toggleActionSheet5: function toggleActionSheet5() {
    this.toggle("show5");
  },
  toggleActionSheet6: function toggleActionSheet6() {
    this.toggle("show6");
  },
  onGetUserInfo: function onGetUserInfo(e) {
    console.log(e.detail);
  }
});