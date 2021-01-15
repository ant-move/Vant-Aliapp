"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _page["default"])({
  data: {
    sms: "",
    value: "",
    password: "",
    username: "",
    username2: "",
    username3: "",
    message: "",
    phone: "1365577"
  },
  onClickIcon: function onClickIcon() {
    wx.showToast({
      icon: "none",
      title: "点击图标"
    });
  }
});