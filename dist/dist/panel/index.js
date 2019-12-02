"use strict";

var _component = require("../common/component");

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "dist/panel/index"
  }
});
(0, _component.VantComponent)({
  classes: ["header-class", "footer-class"],
  props: {
    desc: String,
    title: String,
    status: String,
    useFooterSlot: Boolean
  }
});