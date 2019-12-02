"use strict";

var _component = require("../common/component");

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "dist/loading/index"
  }
});
(0, _component.VantComponent)({
  props: {
    size: {
      type: String,
      value: "30px"
    },
    type: {
      type: String,
      value: "circular"
    },
    color: {
      type: String,
      value: "#c9c9c9"
    }
  }
});