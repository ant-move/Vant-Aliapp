"use strict";

var _config = _interopRequireDefault(require("../../dist/_vant/icons/src/config"));

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    icons: _config["default"],
    active: 0
  },
  onSwitch: function onSwitch(event) {}
});