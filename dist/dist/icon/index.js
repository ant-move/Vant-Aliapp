"use strict";

var _component = require("../common/component");

my.setStorageSync({
  key: "activeComponent",
  data: {
    is: "dist/icon/index"
  }
});
(0, _component.VantComponent)({
  props: {
    info: null,
    name: String,
    size: String,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: "van-icon"
    }
  },
  methods: {
    onClick: function onClick() {
      this.$emit("tap");

      if (this.props && this.props.onTouchstart) {
        this.props.onTouchstart();
      }
    }
  }
});