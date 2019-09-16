"use strict";

var _component = require("../common/component");

var _button = require("../mixins/button");

var _openType = require("../mixins/open-type");

var _my = require("../../__antmove/api/index.js")(my);

(0, _component.VantComponent)({
  mixins: [_button.button, _openType.openType],
  classes: ["hover-class", "loading-class", "my-class"],
  props: {
    icon: String,
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loadingText: String,
    type: {
      type: String,
      value: "default"
    },
    size: {
      type: String,
      value: "normal"
    },
    loadingSize: {
      type: String,
      value: "20px"
    }
  },
  methods: {
    onClick: function onClick(e) {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit("click");
      }

      if (this.props && this.props.onTap) {
        this.props.onTap(e);
      }
    }
  }
});