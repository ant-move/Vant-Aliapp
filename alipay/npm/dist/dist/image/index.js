"use strict";

var _utils = require("../common/utils");

var _component = require("../common/component");

var _button = require("../mixins/button");

var _openType = require("../mixins/open-type");

var FIT_MODE_MAP = {
  none: "center",
  fill: "scaleToFill",
  cover: "aspectFill",
  contain: "aspectFit",
  widthFix: "widthFix",
  heightFix: "heightFix"
};
(0, _component.VantComponent)({
  mixins: [_button.button, _openType.openType],
  classes: ["custom-class", "loading-class", "error-class", "image-class"],
  props: {
    src: {
      type: String,
      observer: function observer() {
        this.setData({
          error: false,
          loading: true
        });
      }
    },
    round: Boolean,
    width: {
      type: null,
      observer: "setStyle"
    },
    height: {
      type: null,
      observer: "setStyle"
    },
    radius: null,
    lazyLoad: Boolean,
    useErrorSlot: Boolean,
    useLoadingSlot: Boolean,
    showMenuByLongpress: Boolean,
    fit: {
      type: String,
      value: "fill",
      observer: "setMode"
    },
    showError: {
      type: Boolean,
      value: true
    },
    showLoading: {
      type: Boolean,
      value: true
    }
  },
  data: {
    error: false,
    loading: true,
    viewStyle: ""
  },
  mounted: function mounted() {
    this.setMode();
    this.setStyle();
  },
  methods: {
    setMode: function setMode() {
      this.setData({
        mode: FIT_MODE_MAP[this.data.fit]
      });
    },
    setStyle: function setStyle() {
      var _this$data = this.data,
          width = _this$data.width,
          height = _this$data.height,
          radius = _this$data.radius;
      var style = "";

      if ((0, _utils.isDef)(width)) {
        style += "width: ".concat((0, _utils.addUnit)(width), ";");
      }

      if ((0, _utils.isDef)(height)) {
        style += "height: ".concat((0, _utils.addUnit)(height), ";");
      }

      if ((0, _utils.isDef)(radius)) {
        style += "overflow: hidden;";
        style += "border-radius: ".concat((0, _utils.addUnit)(radius), ";");
      }

      this.setData({
        viewStyle: style
      });
    },
    onLoad: function onLoad(event) {
      this.setData({
        loading: false
      });
      this.$emit("load", event.detail);
    },
    onError: function onError(event) {
      this.setData({
        loading: false,
        error: true
      });
      this.$emit("error", event.detail);
    },
    onClick: function onClick(event) {
      this.$emit("click", event.detail);
    }
  }
});