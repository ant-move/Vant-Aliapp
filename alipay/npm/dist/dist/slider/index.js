"use strict";

var _component = require("../common/component");

var _touch = require("../mixins/touch");

var _version = require("../common/version");

(0, _component.VantComponent)({
  mixins: [_touch.touch],
  props: {
    disabled: Boolean,
    useButtonSlot: Boolean,
    activeColor: String,
    inactiveColor: String,
    max: {
      type: Number,
      value: 100
    },
    min: {
      type: Number,
      value: 0
    },
    step: {
      type: Number,
      value: 1
    },
    value: {
      type: Number,
      value: 0,
      observer: function observer(val) {
        if (val !== this.value) {
          this.updateValue(val);
        }
      }
    },
    barHeight: {
      type: null,
      value: 2
    }
  },
  created: function created() {
    this.updateValue(this.data.value);
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      if (this.data.disabled) return;
      this.touchStart(event);
      this.startValue = this.format(this.value);
      this.dragStatus = "start";
    },
    onTouchMove: function onTouchMove(event) {
      var _this = this;

      if (this.data.disabled) return;

      if (this.dragStatus === "start") {
        this.$emit("drag-start");
      }

      this.touchMove(event);
      this.dragStatus = "draging";
      this.getRect(".van-slider").then(function (rect) {
        var diff = _this.deltaX / rect.width * 100;
        _this.newValue = _this.startValue + diff;

        _this.updateValue(_this.newValue, false, true);
      });
    },
    onTouchEnd: function onTouchEnd() {
      if (this.data.disabled) return;

      if (this.dragStatus === "draging") {
        this.updateValue(this.newValue, true);
        this.$emit("drag-end");
      }
    },
    onClick: function onClick(event) {
      var _this2 = this;

      if (this.data.disabled) return;
      var min = this.data.min;
      this.getRect(".van-slider").then(function (rect) {
        var value = (event.detail.x - rect.left) / rect.width * _this2.getRange() + min;

        _this2.updateValue(value, true);
      });
    },
    updateValue: function updateValue(value, end, drag) {
      value = this.format(value);
      var min = this.data.min;
      var width = "".concat((value - min) * 100 / this.getRange(), "%");
      this.value = value;
      this.setData({
        barStyle: "\n          width: ".concat(width, ";\n          ").concat(drag ? "transition: none;" : "", "\n        ")
      });

      if (drag) {
        this.$emit("drag", {
          value: value
        });
      }

      if (end) {
        this.$emit("change", value);
      }
    },
    getRange: function getRange() {
      var _this$data = this.data,
          max = _this$data.max,
          min = _this$data.min;
      return max - min;
    },
    format: function format(value) {
      var _this$data2 = this.data,
          max = _this$data2.max,
          min = _this$data2.min,
          step = _this$data2.step;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    }
  }
});