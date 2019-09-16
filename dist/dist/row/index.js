"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  relation: {
    name: "col",
    type: "descendant",
    linked: function linked(target) {
      if (this.data.gutter) {
        target.setGutter(this.data.gutter);
      }
    }
  },
  props: {
    gutter: Number
  },
  watch: {
    gutter: "setGutter"
  },
  ready: function ready() {
    if (this.data.gutter) {
      this.setGutter();
    }
  },
  methods: {
    setGutter: function setGutter() {
      var _this = this;

      var gutter = this.data.gutter;
      var margin = "-".concat(Number(gutter) / 2, "px");
      var style = gutter ? "margin-right: ".concat(margin, "; margin-left: ").concat(margin, ";") : "";
      this.set({
        style: style
      });
      this.getRelationNodes("/dist/col/index").forEach(function (col) {
        col.setGutter(_this.data.gutter);
      });
    }
  }
});