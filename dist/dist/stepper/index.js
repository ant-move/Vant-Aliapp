"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  field: true,
  classes: ["input-class", "plus-class", "minus-class"],
  props: {
    value: null,
    integer: Boolean,
    disabled: Boolean,
    inputWidth: String,
    asyncChange: Boolean,
    disableInput: Boolean,
    min: {
      type: null,
      value: 1
    },
    max: {
      type: null,
      value: Number.MAX_SAFE_INTEGER
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
    }
  },
  computed: {
    minusDisabled: function minusDisabled() {
      return this.data.disabled || this.data.value <= this.data.min;
    },
    plusDisabled: function plusDisabled() {
      return this.data.disabled || this.data.value >= this.data.max;
    }
  },
  watch: {
    value: function value(_value) {
      if (_value === "") {
        return;
      }

      var newValue = this.range(_value);

      if (typeof newValue === "number" && +this.data.value !== newValue) {
        this.set({
          value: newValue
        });
      }
    }
  },
  data: {
    focus: false
  },
  created: function created() {
    this.set({
      value: this.range(this.data.value)
    });
  },
  methods: {
    onFocus: function onFocus(event) {
      this.$emit("focus", event.detail);
    },
    onBlur: function onBlur(event) {
      var value = this.range(this.data.value);
      this.triggerInput(value);
      this.$emit("blur", event.detail);
    },
    // limit value range
    range: function range(value) {
      value = String(value).replace(/[^0-9.-]/g, "");
      return Math.max(Math.min(this.data.max, value), this.data.min);
    },
    onInput: function onInput(event) {
      var _ref = event.detail || {},
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? "" : _ref$value;

      this.triggerInput(value);
    },
    onChange: function onChange(type) {
      if (this.data["".concat(type, "Disabled")]) {
        this.$emit("overlimit", type);
        return;
      }

      var diff = type === "minus" ? -this.data.step : +this.data.step;
      var value = Math.round((+this.data.value + diff) * 100) / 100;
      this.triggerInput(this.range(value));
      this.$emit(type);
    },
    onMinus: function onMinus() {
      this.onChange("minus");
    },
    onPlus: function onPlus() {
      this.onChange("plus");
    },
    triggerInput: function triggerInput(value) {
      this.set({
        value: this.data.asyncChange ? this.data.value : value
      });
      this.$emit("change", value);
    }
  }
});