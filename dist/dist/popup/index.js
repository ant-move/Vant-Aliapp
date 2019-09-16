"use strict";

var _component = require("../common/component");

var _transition = require("../mixins/transition");

var _safeArea = require("../mixins/safe-area");

(0, _component.VantComponent)({
  classes: ["enter-class", "enter-active-class", "enter-to-class", "leave-class", "leave-active-class", "leave-to-class"],
  mixins: [(0, _transition.transition)(false), (0, _safeArea.safeArea)()],
  props: {
    transition: {
      type: String,
      observer: "observeClass"
    },
    customStyle: String,
    overlayStyle: String,
    zIndex: {
      type: Number,
      value: 100
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: "center",
      observer: "observeClass"
    }
  },
  created: function created() {
    this.observeClass();
  },
  methods: {
    onClickOverlay: function onClickOverlay() {
      this.$emit("click-overlay");

      if (this.data.closeOnClickOverlay) {
        this.$emit("close");
      }
    },
    observeClass: function observeClass() {
      var _this$data = this.data,
          transition = _this$data.transition,
          position = _this$data.position;
      var updateData = {
        name: transition || position
      };

      if (transition === "none") {
        updateData.duration = 0;
      }

      this.set(updateData);
    }
  }
});