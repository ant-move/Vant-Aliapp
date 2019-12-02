"use strict";

var _component = require("../common/component");

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "dist/cell-group/index"
  }
});
(0, _component.VantComponent)({
  props: {
    title: String,
    border: {
      type: Boolean,
      value: true
    }
  }
});