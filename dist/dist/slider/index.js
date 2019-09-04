"use strict";

var _component = require("../common/component");

var _touch = require("../mixins/touch");

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
      value: 0
    },
    barHeight: {
      type: String,
      value: "2px"
    }
  },
  watch: {
    value: function value(_value) {
      this.updateValue(_value, false);
    }
  },
  created: function created() {
    this.updateValue(this.data.value);
  },
  methods: {
    onTouchStart: function onTouchStart(event) {
      if (this.data.disabled) return;
      this.touchStart(event);
      this.startValue = this.format(this.data.value);
    },
    onTouchMove: function onTouchMove(event) {
      var _this = this;

      if (this.data.disabled) return;
      this.touchMove(event);
      this.getRect(".van-slider").then(function (rect) {
        var diff = _this.deltaX / rect.width * 100;
        _this.newValue = _this.startValue + diff;

        _this.updateValue(_this.newValue, false, true);
      });
    },
    onTouchEnd: function onTouchEnd() {
      if (this.data.disabled) return;
      this.updateValue(this.newValue, true);
    },
    onClick: function onClick(event) {
      var _this2 = this;

      if (this.data.disabled) return;
      this.getRect(".van-slider").then(function (rect) {
        var value = (event.detail.x - rect.left) / rect.width * 100;

        _this2.updateValue(value, true);
      });
    },
    updateValue: function updateValue(value, end, drag) {
      value = this.format(value);
      this.set({
        value: value,
        barStyle: "width: ".concat(value, "%; height: ").concat(this.data.barHeight, ";")
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
    format: function format(value) {
      var _this$data = this.data,
          max = _this$data.max,
          min = _this$data.min,
          step = _this$data.step;
      return Math.round(Math.max(min, Math.min(value, max)) / step) * step;
    }
  }
});