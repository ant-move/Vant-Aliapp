"use strict";

var _component = require("../common/component");

function emit(target, value) {
  target.$emit("input", value);
  target.$emit("change", value);
}

(0, _component.VantComponent)({
  field: true,
  relation: {
    name: "checkbox-group",
    type: "ancestor",
    current: "checkbox"
  },
  classes: ["icon-class", "label-class"],
  props: {
    value: Boolean,
    disabled: Boolean,
    useIconSlot: Boolean,
    checkedColor: String,
    labelPosition: String,
    labelDisabled: Boolean,
    shape: {
      type: String,
      value: "round"
    },
    iconSize: {
      type: null,
      value: 20
    }
  },
  data: {
    parentDisabled: false
  },
  methods: {
    emitChange: function emitChange(value) {
      if (this.parent) {
        this.setParentValue(this.parent, value);
      } else {
        emit(this, value);
      }
    },
    toggle: function toggle() {
      var _this$data = this.data,
          parentDisabled = _this$data.parentDisabled,
          disabled = _this$data.disabled,
          value = _this$data.value;

      if (!disabled && !parentDisabled) {
        this.emitChange(!value);
      }
    },
    onClickLabel: function onClickLabel() {
      var _this$data2 = this.data,
          labelDisabled = _this$data2.labelDisabled,
          parentDisabled = _this$data2.parentDisabled,
          disabled = _this$data2.disabled,
          value = _this$data2.value;

      if (!disabled && !labelDisabled && !parentDisabled) {
        this.emitChange(!value);
      }
    },
    setParentValue: function setParentValue(parent, value) {
      var parentValue = parent.data.value.slice();
      var name = this.data.name;
      var max = parent.data.max;

      if (value) {
        if (max && parentValue.length >= max) {
          return;
        }

        if (parentValue.indexOf(name) === -1) {
          parentValue.push(name);
          emit(parent, parentValue);
        }
      } else {
        var index = parentValue.indexOf(name);

        if (index !== -1) {
          parentValue.splice(index, 1);
          emit(parent, parentValue);
        }
      }
    }
  }
});