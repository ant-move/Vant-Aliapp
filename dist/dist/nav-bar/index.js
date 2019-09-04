"use strict";

var _component = require("../common/component");

var _safeArea = require("../mixins/safe-area");

(0, _component.VantComponent)({
  mixins: [(0, _safeArea.safeArea)({
    safeAreaInsetTop: true
  })],
  classes: ["title-class"],
  props: {
    title: String,
    fixed: Boolean,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 120
    }
  },
  methods: {
    onClickLeft: function onClickLeft() {
      this.$emit("click-left");
    },
    onClickRight: function onClickRight() {
      this.$emit("click-right");
    }
  }
});