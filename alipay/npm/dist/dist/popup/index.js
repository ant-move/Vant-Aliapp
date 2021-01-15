"use strict";

var _component = require("../common/component");

var _transition = require("../mixins/transition");

(0, _component.VantComponent)({
  classes: ["enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class", "close-icon-class"],
  mixins: [(0, _transition.transition)(false)],
  props: {
    round: Boolean,
    closeable: Boolean,
    customStyle: String,
    overlayStyle: String,
    transition: {
      type: String,
      observer: "observeClass"
    },
    zIndex: {
      type: Number,
      value: 100
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeIcon: {
      type: String,
      value: "cross"
    },
    closeIconPosition: {
      type: String,
      value: "top-right"
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: "center",
      observer: "observeClass"
    },
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: false
    }
  },
  created: function created() {
    this.observeClass();
  },
  methods: {
    onClickCloseIcon: function onClickCloseIcon() {
      this.$emit("close");
    },
    onClickOverlay: function onClickOverlay() {
      this.$emit("click-overlay");

      if (this.data.closeOnClickOverlay) {
        this.$emit("close");
      }
    },
    observeClass: function observeClass() {
      var _this$data = this.data,
          transition = _this$data.transition,
          position = _this$data.position,
          duration = _this$data.duration;
      var updateData = {
        name: transition || position
      };

      if (transition === "none") {
        updateData.duration = 0;
        this.originDuration = duration;
      } else if (this.originDuration != null) {
        updateData.duration = this.originDuration;
      }

      this.setData(updateData);
    }
  }
});