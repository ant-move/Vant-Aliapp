"use strict";

var _component = require("../common/component");

var _color = require("../common/color");

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "dist/steps/index"
  }
});
(0, _component.VantComponent)({
  props: {
    icon: String,
    steps: Array,
    active: Number,
    direction: {
      type: String,
      value: "horizontal"
    },
    activeColor: {
      type: String,
      value: _color.GREEN
    }
  }
});