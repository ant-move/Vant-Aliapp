"use strict";

var _component = require("../common/component");

var _color = require("../common/color");

(0, _component.VantComponent)({
  classes: ["desc-class"],
  props: {
    icon: String,
    steps: Array,
    active: Number,
    direction: {
      type: String,
      value: "horizontal"
    },
    activeColor: {
      type: String,
      value: _color.GREEN
    },
    inactiveColor: {
      type: String,
      value: _color.GRAY_DARK
    },
    activeIcon: {
      type: String,
      value: "checked"
    },
    inactiveIcon: String
  },
  methods: {
    onClick: function onClick(event) {
      var index = event.currentTarget.dataset.index;
      this.$emit("click-step", index);
    }
  }
});