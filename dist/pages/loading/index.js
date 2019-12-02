"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "pages/loading/index"
  }
});
(0, _page["default"])();