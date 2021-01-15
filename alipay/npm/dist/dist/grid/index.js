"use strict";

var _component = require("../common/component");

var _utils = require("../common/utils");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  relation: {
    name: "grid-item",
    type: "descendant",
    current: "grid"
  },
  props: {
    square: {
      type: Boolean,
      observer: "updateChildren"
    },
    gutter: {
      type: [Number, String],
      value: 0,
      observer: "updateChildren"
    },
    clickable: {
      type: Boolean,
      observer: "updateChildren"
    },
    columnNum: {
      type: Number,
      value: 4,
      observer: "updateChildren"
    },
    center: {
      type: Boolean,
      value: true,
      observer: "updateChildren"
    },
    border: {
      type: Boolean,
      value: true,
      observer: "updateChildren"
    },
    direction: {
      type: String,
      observer: "updateChildren"
    },
    iconSize: {
      type: String,
      observer: "updateChildren"
    }
  },
  data: {
    viewStyle: ""
  },
  created: function created() {
    var gutter = this.data.gutter;

    if (gutter) {
      this.setData({
        viewStyle: "padding-left: ".concat((0, _utils.addUnit)(gutter))
      });
    }
  },
  mounted: function mounted() {
    this.updateChildren();
  },
  methods: {
    updateChildren: function updateChildren() {
      var _this = this;

      wx.nextTick(function () {
        _this.children.forEach(function (child) {
          child.updateStyle();
        });
      }, 500);
    }
  }
});