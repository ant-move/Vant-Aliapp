"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  field: true,
  relation: {
    name: "checkbox",
    type: "descendant",
    linked: function linked(target) {
      this.children = this.children || [];
      this.children.push(target);
      this.updateChild(target);
    },
    unlinked: function unlinked(target) {
      this.children = this.children.filter(function (child) {
        return child !== target;
      });
    }
  },
  props: {
    max: {
      type: Number,
      value: 0
    },
    value: {
      type: Array,
      observer: "updateChildren"
    },
    disabled: {
      type: Boolean,
      observer: "updateChildren"
    }
  },
  methods: {
    updateChildren: function updateChildren() {
      var _this = this;

      (this.children || []).forEach(function (child) {
        return _this.updateChild(child);
      });
    },
    updateChild: function updateChild(child) {
      var _this$data = this.data,
          value = _this$data.value,
          disabled = _this$data.disabled;
      child.set({
        value: value.indexOf(child.data.name) !== -1,
        disabled: disabled || child.data.disabled
      });
    }
  }
});