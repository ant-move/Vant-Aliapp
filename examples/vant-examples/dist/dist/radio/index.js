"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  field: true,
  relation: {
    name: "radio-group",
    type: "ancestor",
    linked: function linked(target) {
      this.parent = target;
    },
    unlinked: function unlinked() {
      this.parent = null;
    }
  },
  classes: ["icon-class", "label-class"],
  props: {
    value: null,
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: String,
    labelPosition: {
      type: String,
      value: "right"
    },
    labelDisabled: Boolean,
    shape: {
      type: String,
      value: "round"
    }
  },
  methods: {
    emitChange: function emitChange(value) {
      var instance = this.parent || this;
      instance.$emit("input", value);
      instance.$emit("change", value);
    },
    onChange: function onChange(event) {
      this.emitChange(this.data.name);
    },
    onClickLabel: function onClickLabel() {
      var _this$data = this.data,
          disabled = _this$data.disabled,
          labelDisabled = _this$data.labelDisabled,
          name = _this$data.name;

      if (!disabled && !labelDisabled) {
        this.emitChange(name);
      }
    }
  }
});