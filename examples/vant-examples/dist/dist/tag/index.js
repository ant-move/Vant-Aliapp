"use strict";

var _component = require("../common/component");

var _color = require("../common/color");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_COLOR = "#999";
var COLOR_MAP = {
  danger: _color.RED,
  primary: _color.BLUE,
  success: _color.GREEN
};
(0, _component.VantComponent)({
  classes: ["my-class"],
  props: {
    size: String,
    type: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String
  },
  computed: {
    style: function style() {
      var color = this.data.color || COLOR_MAP[this.data.type] || DEFAULT_COLOR;
      var key = this.data.plain ? "color" : "background-color";

      var style = _defineProperty({}, key, color);

      if (this.data.textColor) {
        style.color = this.data.textColor;
      }

      return Object.keys(style).map(function (key) {
        return "".concat(key, ": ").concat(style[key]);
      }).join(";");
    }
  }
});