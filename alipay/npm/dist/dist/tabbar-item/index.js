"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  props: {
    info: null,
    name: null,
    icon: String,
    dot: Boolean,
    iconPrefix: {
      type: String,
      value: "van-icon"
    }
  },
  relation: {
    name: "tabbar",
    type: "ancestor",
    current: "tabbar-item"
  },
  data: {
    active: false
  },
  methods: {
    onClick: function onClick() {
      var parent = this.parent;

      if (parent) {
        var index = parent.children.indexOf(this);
        var active = this.data.name || index;

        if (active !== this.data.active) {
          parent.$emit("change", active);
        }
      }

      this.$emit("click");
    },
    updateFromParent: function updateFromParent() {
      var parent = this.parent;

      if (!parent) {
        return;
      }

      var index = parent.children.indexOf(this);
      var parentData = parent.data;
      var data = this.data;
      var active = (data.name || index) === parentData.active;
      var patch = {};

      if (active !== data.active) {
        patch.active = active;
      }

      if (parentData.activeColor !== data.activeColor) {
        patch.activeColor = parentData.activeColor;
      }

      if (parentData.inactiveColor !== data.inactiveColor) {
        patch.inactiveColor = parentData.inactiveColor;
      }

      if (Object.keys(patch).length > 0) {
        this.setData(patch);
      }
    }
  }
});