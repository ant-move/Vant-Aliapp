"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  relation: {
    name: "row",
    type: "ancestor"
  },
  props: {
    span: Number,
    offset: Number
  },
  data: {
    style: ""
  },
  methods: {
    setGutter: function setGutter(gutter) {
      var padding = "".concat(gutter / 2, "px");
      var style = gutter ? "padding-left: ".concat(padding, "; padding-right: ").concat(padding, ";") : "";

      if (style !== this.data.style) {
        this.set({
          style: style
        });
      }
    }
  }
});