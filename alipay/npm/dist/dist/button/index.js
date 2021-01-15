"use strict";

var _component = require("../common/component");

var _button = require("../mixins/button");

var _openType = require("../mixins/open-type");

var _version = require("../common/version");

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
var mixins = [_button.button, _openType.openType];

if ((0, _version.canIUseFormFieldButton)()) {
  mixins.push("wx://form-field-button");
}

(0, _component.VantComponent)({
  mixins: mixins,
  classes: ["hover-class", "loading-class"],
  data: {
    baseStyle: ""
  },
  props: {
    formType: String,
    icon: String,
    classPrefix: {
      type: String,
      value: "van-icon"
    },
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loadingText: String,
    customStyle: String,
    loadingType: {
      type: String,
      value: "circular"
    },
    type: {
      type: String,
      value: "default"
    },
    dataset: null,
    size: {
      type: String,
      value: "normal"
    },
    loadingSize: {
      type: String,
      value: "20px"
    },
    color: {
      type: String,
      observer: function observer(color) {
        var style = "";

        if (color) {
          style += "color: ".concat(this.data.plain ? color : "white", ";");

          if (!this.data.plain) {
            // Use background instead of backgroundColor to make linear-gradient work
            style += "background: ".concat(color, ";");
          } // hide border when color is linear-gradient


          if (color.indexOf("gradient") !== -1) {
            style += "border: 0;";
          } else {
            style += "border-color: ".concat(color, ";");
          }
        }

        if (style !== this.data.baseStyle) {
          this.setData({
            baseStyle: style
          });
        }
      }
    }
  },
  methods: {
    onClick: function onClick() {
      if (!this.data.loading) {
        this.$emit("click");
      }
    },
    noop: function noop() {}
  }
});