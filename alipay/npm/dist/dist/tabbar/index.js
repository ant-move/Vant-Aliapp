"use strict";

var _utils = require("../common/utils");

var _component = require("../common/component");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
(0, _component.VantComponent)({
  relation: {
    name: "tabbar-item",
    type: "descendant",
    current: "tabbar",
    linked: function linked(target) {
      target.parent = this;
      target.updateFromParent();
    },
    unlinked: function unlinked() {
      this.updateChildren();
    }
  },
  props: {
    active: {
      type: null,
      observer: "updateChildren"
    },
    activeColor: {
      type: String,
      observer: "updateChildren"
    },
    inactiveColor: {
      type: String,
      observer: "updateChildren"
    },
    fixed: {
      type: Boolean,
      value: true,
      observer: "setHeight"
    },
    placeholder: {
      type: Boolean,
      observer: "setHeight"
    },
    border: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  data: {
    height: 50
  },
  methods: {
    updateChildren: function updateChildren() {
      var children = this.children;

      if (!Array.isArray(children) || !children.length) {
        return;
      }

      children.forEach(function (child) {
        return child.updateFromParent();
      });
    },
    setHeight: function setHeight() {
      var _this = this;

      if (!this.data.fixed || !this.data.placeholder) {
        return;
      }

      wx.nextTick(function () {
        _utils.getRect.call(_this, ".van-tabbar").then(function (res) {
          _this.setData({
            height: res.height
          });
        });
      });
    }
  }
});