"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _dialog = _interopRequireDefault(require("../../dist/dialog/dialog"));

var _notify = _interopRequireDefault(require("../../dist/notify/notify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  onClose: function onClose(event) {
    var _event$detail = event.detail,
        position = _event$detail.position,
        instance = _event$detail.instance;

    switch (position) {
      case "left":
      case "cell":
        instance.close();
        break;

      case "right":
        _dialog["default"].confirm({
          message: "确定删除吗？"
        }).then(function () {
          instance.close();
        });

        break;
    }
  },
  onOpen: function onOpen(event) {
    var _event$detail2 = event.detail,
        position = _event$detail2.position,
        name = _event$detail2.name;

    switch (position) {
      case "left":
        (0, _notify["default"])({
          type: "primary",
          message: "".concat(name).concat(position, "\u90E8\u5206\u5C55\u793Aopen\u4E8B\u4EF6\u88AB\u89E6\u53D1")
        });
        break;

      case "right":
        (0, _notify["default"])({
          type: "primary",
          message: "".concat(name).concat(position, "\u90E8\u5206\u5C55\u793Aopen\u4E8B\u4EF6\u88AB\u89E6\u53D1")
        });
        break;
    }
  }
});