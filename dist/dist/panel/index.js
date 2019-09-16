"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  classes: ["header-class", "footer-class"],
  props: {
    desc: String,
    title: String,
    status: String,
    useFooterSlot: Boolean
  }
});