"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  relation: {
    name: "col",
    type: "descendant",
    current: "row",
    linked: function linked(target) {
      if (this.data.gutter) {
        target.setGutter(this.data.gutter);
      }
    }
  },
  props: {
    gutter: {
      type: Number,
      observer: "setGutter"
    }
  },
  data: {
    viewStyle: ""
  },
  mounted: function mounted() {
    if (this.data.gutter) {
      this.setGutter();
    }
  },
  methods: {
    setGutter: function setGutter() {
      var _this = this;

      var gutter = this.data.gutter;
      var margin = "-".concat(Number(gutter) / 2, "px");
      var viewStyle = gutter ? "margin-right: ".concat(margin, "; margin-left: ").concat(margin, ";") : "";
      this.setData({
        viewStyle: viewStyle
      });
      this.getRelationNodes("../col/index").forEach(function (col) {
        col.setGutter(_this.data.gutter);
      });
    }
  }
});