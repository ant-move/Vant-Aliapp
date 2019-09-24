"use strict";

var _component = require("../common/component");

var _color = require("../common/color");

(0, _component.VantComponent)({
  props: {
    inactive: Boolean,
    percentage: Number,
    pivotText: String,
    pivotColor: String,
    showPivot: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: _color.BLUE
    },
    textColor: {
      type: String,
      value: "#fff"
    }
  }
});