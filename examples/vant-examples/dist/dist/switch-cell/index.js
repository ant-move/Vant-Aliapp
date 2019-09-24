"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  field: true,
  props: {
    value: null,
    icon: String,
    title: String,
    label: String,
    border: Boolean,
    checked: Boolean,
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    useLabelSlot: Boolean,
    size: {
      type: String,
      value: "24px"
    },
    activeValue: {
      type: null,
      value: true
    },
    inactiveValue: {
      type: null,
      value: false
    }
  },
  watch: {
    checked: function checked(value) {
      this.set({
        value: value
      });
    }
  },
  created: function created() {
    this.set({
      value: this.data.checked
    });
  },
  methods: {
    onChange: function onChange(event) {
      this.$emit("change", event.detail);
    }
  }
});