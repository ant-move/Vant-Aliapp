"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  field: true,
  relation: {
    name: "checkbox",
    type: "descendant",
    current: "checkbox-group",
    linked: function linked(target) {
      this.updateChild(target);
    }
  },
  props: {
    max: Number,
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
      child.setData({
        value: value.indexOf(child.data.name) !== -1,
        parentDisabled: disabled
      });
    }
  }
});