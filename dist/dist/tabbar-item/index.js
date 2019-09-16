"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  props: {
    info: null,
    icon: String,
    dot: Boolean,
    name: {
      type: [String, Number]
    }
  },
  relation: {
    name: "tabbar",
    type: "ancestor"
  },
  data: {
    active: false
  },
  methods: {
    onClick: function onClick() {
      if (this.parent) {
        this.parent.onChange(this);
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

      return Object.keys(patch).length > 0 ? this.set(patch) : Promise.resolve();
    }
  }
});