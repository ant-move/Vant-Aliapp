"use strict";

var _component = require("../common/component");

var _safeArea = require("../mixins/safe-area");

(0, _component.VantComponent)({
  mixins: [(0, _safeArea.safeArea)()],
  relation: {
    name: "tabbar-item",
    type: "descendant",
    linked: function linked(target) {
      this.children.push(target);
      target.parent = this;
      target.updateFromParent();
    },
    unlinked: function unlinked(target) {
      this.children = this.children.filter(function (item) {
        return item !== target;
      });
      this.updateChildren();
    }
  },
  props: {
    active: {
      type: [Number, String],
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
      value: true
    },
    border: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },
  beforeCreate: function beforeCreate() {
    this.children = [];
  },
  methods: {
    updateChildren: function updateChildren() {
      var children = this.children;

      if (!Array.isArray(children) || !children.length) {
        return Promise.resolve();
      }

      return Promise.all(children.map(function (child) {
        return child.updateFromParent();
      }));
    },
    onChange: function onChange(child) {
      var index = this.children.indexOf(child);
      var active = child.data.name || index;

      if (active !== this.data.active) {
        this.$emit("change", active);
      }
    }
  }
});