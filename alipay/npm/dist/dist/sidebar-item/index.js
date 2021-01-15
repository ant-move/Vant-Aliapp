"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  classes: ["active-class", "disabled-class"],
  relation: {
    type: "ancestor",
    name: "sidebar",
    current: "sidebar-item"
  },
  props: {
    dot: Boolean,
    badge: null,
    info: null,
    title: String,
    disabled: Boolean
  },
  methods: {
    onClick: function onClick() {
      var _this = this;

      var parent = this.parent;

      if (!parent || this.data.disabled) {
        return;
      }

      var index = parent.children.indexOf(this);
      parent.setActive(index).then(function () {
        _this.$emit("click", index);

        parent.$emit("change", index);
      });
    },
    setActive: function setActive(selected) {
      return this.setData({
        selected: selected
      });
    }
  }
});