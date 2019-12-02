"use strict";

var _component = require("../common/component");

var _safeArea = require("../mixins/safe-area");

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "dist/goods-action/index"
  }
});
(0, _component.VantComponent)({
  mixins: [(0, _safeArea.safeArea)()]
});