"use strict";

var _config = _interopRequireDefault(require("../../dist/_vant/icons/src/config"));

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    icons: _config["default"],
    active: 0,
    demoIcon: "chat-o",
    demoImage: "https://b.yzcdn.cn/vant/icon-demo-1126.png"
  },
  onSwitch: function onSwitch(event) {
    this.setData({
      active: event.detail.index
    });
  }
});