"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  field: true,
  relation: {
    name: "radio",
    type: "descendant",
    current: "radio-group",
    linked: function linked(target) {
      this.updateChild(target);
    }
  },
  props: {
    value: {
      type: null,
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
      child.setData({
        value: value,
        disabled: disabled || child.data.disabled
      });
    }
  }
});