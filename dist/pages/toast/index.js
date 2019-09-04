"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

var _toast = _interopRequireDefault(require("../../dist/toast/toast"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  showToast: function showToast() {
    (0, _toast["default"])("提示内容");
  },
  showLongToast: function showLongToast() {
    (0, _toast["default"])("这是一条长文字提示，超过一定字数就会换行");
  },
  showLoadingToast: function showLoadingToast() {
    _toast["default"].loading({
      mask: true,
      message: "加载中..."
    });
  },
  showSuccessToast: function showSuccessToast() {
    _toast["default"].success("成功文案");
  },
  showFailToast: function showFailToast() {
    _toast["default"].fail("失败提示");
  },
  showCustomizedToast: function showCustomizedToast(duration) {
    var text = function text(second) {
      return "\u5012\u8BA1\u65F6 ".concat(second, " \u79D2");
    };

    var toast = _toast["default"].loading({
      duration: 0,
      forbidClick: true,
      loadingType: "spinner",
      message: text(3)
    });

    var second = 3;
    var timer = setInterval(function () {
      second--;

      if (second) {
        toast.setData({
          message: text(second)
        });
      } else {
        clearInterval(timer);

        _toast["default"].clear();
      }
    }, 1000);
  }
});