"use strict";

var _component = require("../common/component");

var _transition = require("../mixins/transition");

(0, _component.VantComponent)({
  classes: ["enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class"],
  props: {
    inited: {
      type: Boolean
    },
    display: {
      type: Boolean
    }
  },
  mixins: [(0, _transition.transition)(true)],
  methods: {
    dealTap: function dealTap() {
      this.$emit("tap");
      this.$emit("click");
    }
  }
});