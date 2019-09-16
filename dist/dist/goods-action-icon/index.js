"use strict";

var _component = require("../common/component");

var _link = require("../mixins/link");

var _button = require("../mixins/button");

var _openType = require("../mixins/open-type");

(0, _component.VantComponent)({
  classes: ["icon-class", "text-class"],
  mixins: [_link.link, _button.button, _openType.openType],
  props: {
    text: String,
    info: String,
    icon: String,
    disabled: Boolean,
    loading: Boolean
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit("click", event.detail);
      this.jumpLink();
    }
  }
});