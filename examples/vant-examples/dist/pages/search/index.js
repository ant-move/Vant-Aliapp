"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

(0, _page["default"])({
  data: {
    value: ""
  },
  onChange: function onChange(e) {
    this.setData({
      value: e.detail
    });
  },
  onSearch: function onSearch(event) {
    if (this.data.value) {
      _my.showToast({
        title: "搜索：" + this.data.value,
        icon: "none"
      });
    }
  },
  onCancel: function onCancel() {
    _my.showToast({
      title: "取消",
      icon: "none"
    });
  },
  onClear: function onClear() {
    _my.showToast({
      title: "清空",
      icon: "none"
    });
  }
});