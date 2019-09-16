"use strict";

var _page = _interopRequireDefault(require("../../common/page"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _my = require("../../__antmove/api/index.js")(my);

(0, _page["default"])({
  data: {
    show: {
      middle: false,
      top: false,
      bottom: false,
      right: false,
      right2: false
    }
  },
  onTransitionEnd: function onTransitionEnd() {
    console.log("You can't see me \uD83C\uDF1A");
  },
  toggle: function toggle(type) {
    this.setData(_defineProperty({}, "show.".concat(type), !this.data.show[type]));
  },
  togglePopup: function togglePopup() {
    this.toggle("middle");
  },
  toggleRightPopup: function toggleRightPopup() {
    this.toggle("right");
  },
  toggleRightPopup2: function toggleRightPopup2() {
    this.toggle("right2");
  },
  toggleBottomPopup: function toggleBottomPopup() {
    this.toggle("bottom");
  },
  toggleTopPopup: function toggleTopPopup() {
    var _this = this;

    this.toggle("top");
    setTimeout(function () {
      _this.toggle("top");
    }, 2000);
  },
  onClickLeft: function onClickLeft() {
    _my.navigateBack();
  }
});