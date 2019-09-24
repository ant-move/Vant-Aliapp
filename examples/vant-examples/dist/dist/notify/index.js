"use strict";

var _component = require("../common/component");

var _color = require("../common/color");

var _safeArea = require("../mixins/safe-area");

(0, _component.VantComponent)({
  mixins: [(0, _safeArea.safeArea)()],
  props: {
    text: String,
    color: {
      type: String,
      value: "#fff"
    },
    backgroundColor: {
      type: String,
      value: _color.RED
    },
    duration: {
      type: Number,
      value: 3000
    },
    zIndex: {
      type: Number,
      value: 110
    }
  },
  methods: {
    show: function show() {
      var duration = this.data.duration;
      clearTimeout(this.timer);
      console.log(this.data.show, this.data);
      this.set({
        show: true
      });

      if (duration > 0 && duration !== Infinity) {
        this.timer = setTimeout(function () {//this.hide();
        }, duration);
      }
    },
    hide: function hide() {
      clearTimeout(this.timer);
      this.set({
        show: false
      });
    }
  }
});