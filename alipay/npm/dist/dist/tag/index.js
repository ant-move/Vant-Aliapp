"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  props: {
    size: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean,
    textColor: String,
    type: {
      type: String,
      value: "default"
    },
    closeable: Boolean
  },
  methods: {
    onClose: function onClose() {
      this.$emit("close");
    }
  }
});