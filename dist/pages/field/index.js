"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

(0, _page["default"])({
  data: {
    sms: "",
    value: "",
    password: "",
    username: "",
    username2: "",
    message: "",
    phone: "1365577"
  },
  onClickIcon: function onClickIcon() {
    _my.showToast({
      icon: "none",
      title: "点击图标"
    });
  },
  onFieldChange: function onFieldChange(_ref) {
    var detail = _ref.detail;
    console.log("change", detail);
    this.setData({
      sms: detail
    });
  },
  onFieldBlur: function onFieldBlur(_ref2) {
    var detail = _ref2.detail;
    console.log("blur", detail);
  },
  onSendSms: function onSendSms() {
    console.log("onSendSms", this.data.sms);
  }
});