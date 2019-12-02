"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "pages/slider/index"
  }
});
(0, _page["default"])({
  data: {
    currentValue: 50
  },
  onChange: function onChange(event) {
    _my.showToast({
      icon: "none",
      title: "\u5F53\u524D\u503C\uFF1A".concat(event.detail)
    });
  },
  onDrag: function onDrag(event) {
    this.setData({
      currentValue: event.detail.value
    });
  }
});