"use strict";

var _config = _interopRequireDefault(require("../../config"));

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _my = require("../../__antmove/api/index.js")(my);

(0, _page["default"])({
  data: {
    list: _config["default"],
    activeName: []
  },
  onChangeCollapse: function onChangeCollapse(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  onClick: function onClick(event) {
    var _event$currentTarget$ = event.currentTarget.dataset,
        switchTab = _event$currentTarget$.switchTab,
        url = _event$currentTarget$.url;

    if (switchTab) {
      _my.switchTab({
        url: url
      });
    }
  }
});