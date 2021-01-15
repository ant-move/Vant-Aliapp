"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _page["default"])({
  data: {
    show: {
      basic: false,
      top: false,
      bottom: false,
      left: false,
      right: false,
      round: false,
      closeIcon: false,
      customCloseIcon: false,
      customIconPosition: false
    }
  },
  toggle: function toggle(type, show) {
    this.setData(_defineProperty({}, "show.".concat(type), show));
  },
  showBasic: function showBasic() {
    this.toggle("basic", true);
  },
  hideBasic: function hideBasic() {
    this.toggle("basic", false);
  },
  showTop: function showTop() {
    this.toggle("top", true);
  },
  hideTop: function hideTop() {
    this.toggle("top", false);
  },
  showLeft: function showLeft() {
    this.toggle("left", true);
  },
  hideLeft: function hideLeft() {
    this.toggle("left", false);
  },
  showRight: function showRight() {
    this.toggle("right", true);
  },
  hideRight: function hideRight() {
    this.toggle("right", false);
  },
  showBottom: function showBottom() {
    this.toggle("bottom", true);
  },
  hideBottom: function hideBottom() {
    this.toggle("bottom", false);
  },
  showRound: function showRound() {
    this.toggle("round", true);
  },
  hideRound: function hideRound() {
    this.toggle("round", false);
  },
  showCloseIcon: function showCloseIcon() {
    this.toggle("closeIcon", true);
  },
  hideCloseIcon: function hideCloseIcon() {
    this.toggle("closeIcon", false);
  },
  showCustomCloseIcon: function showCustomCloseIcon() {
    this.toggle("customCloseIcon", true);
  },
  hideCustomCloseIcon: function hideCustomCloseIcon() {
    this.toggle("customCloseIcon", false);
  },
  showCustomIconPosition: function showCustomIconPosition() {
    this.toggle("customIconPosition", true);
  },
  hideCustomIconPosition: function hideCustomIconPosition() {
    this.toggle("customIconPosition", false);
  }
});