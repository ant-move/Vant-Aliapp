"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  relation: {
    type: "ancestor",
    name: "badge-group",
    linked: function linked(target) {
      this.parent = target;
    }
  },
  props: {
    info: null,
    title: String
  },
  methods: {
    onClick: function onClick() {
      var _this = this;

      var parent = this.parent;

      if (!parent) {
        return;
      }

      var index = parent.badges.indexOf(this);
      parent.setActive(index).then(function () {
        _this.$emit("click", index);

        parent.$emit("change", index);
      });
    },
    setActive: function setActive(active) {
      return this.set({
        active: active
      });
    }
  }
});