"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  props: {
    show: Boolean,
    mask: Boolean,
    customStyle: String,
    duration: {
      type: [Number, Object],
      value: 300
    },
    zIndex: {
      type: Number,
      value: 1
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit("click");
    },
    // for prevent touchmove
    noop: function noop() {}
  }
});