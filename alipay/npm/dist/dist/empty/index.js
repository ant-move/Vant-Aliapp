"use strict";

var _component = require("../common/component");

var PRESETS = ["error", "search", "default", "network"];
(0, _component.VantComponent)({
  props: {
    description: String,
    image: {
      type: String,
      value: "default"
    }
  },
  created: function created() {
    if (PRESETS.indexOf(this.data.image) !== -1) {
      this.setData({
        imageUrl: "https://img.yzcdn.cn/vant/empty-image-".concat(this.data.image, ".png")
      });
    } else {
      this.setData({
        imageUrl: this.data.image
      });
    }
  }
});