"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  relation: {
    name: "row",
    type: "ancestor",
    current: "col"
  },
  props: {
    span: Number,
    offset: Number
  },
  data: {
    viewStyle: ""
  },
  methods: {
    setGutter: function setGutter(gutter) {
      var padding = "".concat(gutter / 2, "px");
      var viewStyle = gutter ? "padding-left: ".concat(padding, "; padding-right: ").concat(padding, ";") : "";

      if (viewStyle !== this.data.viewStyle) {
        this.setData({
          viewStyle: viewStyle
        });
      }
    }
  }
});