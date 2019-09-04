"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _page["default"])({
  data: {
    show: false,
    name: "fade",
    showCustom: false
  },
  onClickFade: function onClickFade() {
    this.trigger("fade");
  },
  onClickFadeUp: function onClickFadeUp() {
    this.trigger("fade-up");
  },
  onClickFadeDown: function onClickFadeDown() {
    this.trigger("fade-down");
  },
  onClickFadeLeft: function onClickFadeLeft() {
    this.trigger("fade-left");
  },
  onClickFadeRight: function onClickFadeRight() {
    this.trigger("fade-right");
  },
  onClickSlideUp: function onClickSlideUp() {
    this.trigger("slide-up");
  },
  onClickSlideDown: function onClickSlideDown() {
    this.trigger("slide-down");
  },
  onClickSlideLeft: function onClickSlideLeft() {
    this.trigger("slide-left");
  },
  onClickSlideRight: function onClickSlideRight() {
    this.trigger("slide-right");
  },
  trigger: function trigger(name) {
    var _this = this;

    this.setData({
      name: name,
      show: true
    });
    setTimeout(function () {
      _this.setData({
        show: false
      });
    }, 500);
  },
  onClickCustom: function onClickCustom() {
    var _this2 = this;

    this.setData({
      showCustom: true
    });
    setTimeout(function () {
      _this2.setData({
        showCustom: false
      });
    }, 500);
  }
});