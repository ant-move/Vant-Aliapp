"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  props: {
    dot: Boolean,
    info: null,
    size: null,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: "van-icon"
    },
    score: Number,
    hidden: {
      type: Boolean,
      value: true
    },
    name: String
  },
  methods: {
    onClick: function onClick(action) {
      this.$emit("click", action);
    }
  }
});