"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  relation: {
    name: "badge",
    type: "descendant"
  },
  props: {
    active: {
      type: Number,
      value: 0,
      observer: "setActive"
    }
  },
  beforeCreate: function beforeCreate() {
    this.badges = [];
    this.currentActive = -1;
  },
  methods: {
    setActive: function setActive(active) {
      var badges = this.badges,
          currentActive = this.currentActive;

      if (!badges.length) {
        return Promise.resolve();
      }

      this.currentActive = active;
      var stack = [];

      if (currentActive !== active && badges[currentActive]) {
        stack.push(badges[currentActive].setActive(false));
      }

      if (badges[active]) {
        stack.push(badges[active].setActive(true));
      }

      return Promise.all(stack);
    },
    linked: function linked(target) {
      this.badges.push(target);
      this.setActive(this.data.active);
    },
    unlinked: function unlinked(target) {
      this.badges = this.badges.filter(function (item) {
        return item !== target;
      });
      this.setActive(this.data.active);
    }
  }
});