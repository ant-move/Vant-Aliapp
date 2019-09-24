"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  props: {
    show: Boolean,
    mask: Boolean,
    message: String,
    forbidClick: Boolean,
    zIndex: {
      type: Number,
      value: 1000
    },
    type: {
      type: String,
      value: "text"
    },
    loadingType: {
      type: String,
      value: "circular"
    },
    position: {
      type: String,
      value: "middle"
    }
  },
  methods: {
    // for prevent touchmove
    noop: function noop() {}
  }
});