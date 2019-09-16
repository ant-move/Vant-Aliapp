"use strict";

var _component = require("../common/component");

var _transition = require("../mixins/transition");

(0, _component.VantComponent)({
  classes: ["enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class"],
  mixins: [(0, _transition.transition)(true)],
  methods: {
    onTap: function onTap() {
      this.props.onTap && this.props.onTap();
    }
  }
});