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
    linked: function linked(target) {
      this.parent = target;
    },
    unlinked: function unlinked() {
      this.parent = null;
    }
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
    }
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
          disabled = _this$data.disabled,
          value = _this$data.value;

      if (!disabled) {
        this.emitChange(!value);
      }
    },
    onClickLabel: function onClickLabel() {
      var _this$data2 = this.data,
          labelDisabled = _this$data2.labelDisabled,
          disabled = _this$data2.disabled,
          value = _this$data2.value;

      if (!disabled && !labelDisabled) {
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
          console.log(parentValue, this.data);
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