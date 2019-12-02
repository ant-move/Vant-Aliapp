"use strict";

var _component = require("../common/component");

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "dist/info/index"
  }
});
(0, _component.VantComponent)({
  props: {
    info: null,
    customStyle: String
  }
});