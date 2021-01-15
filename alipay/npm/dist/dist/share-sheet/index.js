"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  props: {
    // whether to show popup
    show: Boolean,
    // overlay custom style
    overlayStyle: Object,
    // z-index
    zIndex: {
      type: Number,
      value: 100
    },
    title: String,
    cancelText: {
      type: String,
      value: "取消"
    },
    description: String,
    options: {
      type: Array,
      value: []
    },
    overlay: {
      type: Boolean,
      value: true
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    duration: {
      type: null,
      value: 300
    }
  },
  methods: {
    onClickOverlay: function onClickOverlay() {
      this.$emit("click-overlay");
    },
    onCancel: function onCancel() {
      this.onClose();
      this.$emit("cancel");
    },
    onSelect: function onSelect(event) {
      this.$emit("select", event.detail);
    },
    onClose: function onClose() {
      this.$emit("close");
    }
  }
});