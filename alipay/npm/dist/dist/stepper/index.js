"use strict";

var _component = require("../common/component");

var _utils = require("../common/utils");

var LONG_PRESS_START_TIME = 600;
var LONG_PRESS_INTERVAL = 200; // add num and avoid float number

function add(num1, num2) {
  var cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

function equal(value1, value2) {
  return String(value1) === String(value2);
}

(0, _component.VantComponent)({
  field: true,
  classes: ["input-class", "plus-class", "minus-class"],
  props: {
    value: {
      type: null,
      observer: function observer(value) {
        if (!equal(value, this.data.currentValue)) {
          this.setData({
            currentValue: this.format(value)
          });
        }
      }
    },
    integer: {
      type: Boolean,
      observer: "check"
    },
    disabled: Boolean,
    inputWidth: null,
    buttonSize: null,
    asyncChange: Boolean,
    disableInput: Boolean,
    decimalLength: {
      type: Number,
      value: null,
      observer: "check"
    },
    min: {
      type: null,
      value: 1,
      observer: "check"
    },
    max: {
      type: null,
      value: Number.MAX_SAFE_INTEGER,
      observer: "check"
    },
    step: {
      type: null,
      value: 1
    },
    showPlus: {
      type: Boolean,
      value: true
    },
    showMinus: {
      type: Boolean,
      value: true
    },
    disablePlus: Boolean,
    disableMinus: Boolean,
    longPress: {
      type: Boolean,
      value: true
    }
  },
  data: {
    currentValue: ""
  },
  created: function created() {
    this.setData({
      currentValue: this.format(this.data.value)
    });
  },
  methods: {
    check: function check() {
      var val = this.format(this.data.currentValue);

      if (!equal(val, this.data.currentValue)) {
        this.setData({
          currentValue: val
        });
      }
    },
    isDisabled: function isDisabled(type) {
      if (type === "plus") {
        return this.data.disabled || this.data.disablePlus || this.data.currentValue >= this.data.max;
      }

      return this.data.disabled || this.data.disableMinus || this.data.currentValue <= this.data.min;
    },
    onFocus: function onFocus(event) {
      this.$emit("focus", event.detail);
    },
    onBlur: function onBlur(event) {
      var value = this.format(event.detail.value);
      this.emitChange(value);
      this.$emit("blur", Object.assign(Object.assign({}, event.detail), {
        value: value
      }));
    },
    // filter illegal characters
    filter: function filter(value) {
      value = String(value).replace(/[^0-9.-]/g, "");

      if (this.data.integer && value.indexOf(".") !== -1) {
        value = value.split(".")[0];
      }

      return value;
    },
    // limit value range
    format: function format(value) {
      value = this.filter(value); // format range

      value = value === "" ? 0 : +value;
      value = Math.max(Math.min(this.data.max, value), this.data.min); // format decimal

      if ((0, _utils.isDef)(this.data.decimalLength)) {
        value = value.toFixed(this.data.decimalLength);
      }

      return value;
    },
    onInput: function onInput(event) {
      var _ref = event.detail || {},
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? "" : _ref$value; // allow input to be empty


      if (value === "") {
        return;
      }

      var formatted = this.filter(value); // limit max decimal length

      if ((0, _utils.isDef)(this.data.decimalLength) && formatted.indexOf(".") !== -1) {
        var pair = formatted.split(".");
        formatted = "".concat(pair[0], ".").concat(pair[1].slice(0, this.data.decimalLength));
      }

      this.emitChange(formatted);
    },
    emitChange: function emitChange(value) {
      if (!this.data.asyncChange) {
        this.setData({
          currentValue: value
        });
      }

      this.$emit("change", value);
    },
    onChange: function onChange() {
      var type = this.type;

      if (this.isDisabled(type)) {
        this.$emit("overlimit", type);
        return;
      }

      var diff = type === "minus" ? -this.data.step : +this.data.step;
      var value = this.format(add(+this.data.currentValue, diff));
      this.emitChange(value);
      this.$emit(type);
    },
    longPressStep: function longPressStep() {
      var _this = this;

      this.longPressTimer = setTimeout(function () {
        _this.onChange();

        _this.longPressStep();
      }, LONG_PRESS_INTERVAL);
    },
    onTap: function onTap(event) {
      var type = event.currentTarget.dataset.type;
      this.type = type;
      this.onChange();
    },
    onTouchStart: function onTouchStart(event) {
      var _this2 = this;

      if (!this.data.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);
      var type = event.currentTarget.dataset.type;
      this.type = type;
      this.isLongPress = false;
      this.longPressTimer = setTimeout(function () {
        _this2.isLongPress = true;

        _this2.onChange();

        _this2.longPressStep();
      }, LONG_PRESS_START_TIME);
    },
    onTouchEnd: function onTouchEnd() {
      if (!this.data.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);
    }
  }
});