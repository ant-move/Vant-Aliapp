"use strict";

var _utils = require("../common/utils");

var _component = require("../common/component");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  relation: {
    name: "index-bar",
    type: "ancestor",
    current: "index-anchor"
  },
  props: {
    useSlot: Boolean,
    index: null
  },
  data: {
    active: false,
    wrapperStyle: "",
    anchorStyle: ""
  },
  methods: {
    scrollIntoView: function scrollIntoView(scrollTop) {
      var _this = this;

      _utils.getRect.call(this, ".van-index-anchor-wrapper").then(function (rect) {
        wx.pageScrollTo({
          duration: 0,
          scrollTop: scrollTop + rect.top - _this.parent.data.stickyOffsetTop
        });
      });
    }
  }
});