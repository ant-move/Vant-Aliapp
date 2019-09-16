"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _dialog = _interopRequireDefault(require("../../dist/dialog/dialog"));

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
  }
});