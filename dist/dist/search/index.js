"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  field: true,
  classes: ["field-class", "input-class", "cancel-class"],
  props: {
    focus: Boolean,
    error: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    inputAlign: String,
    showAction: Boolean,
    useActionSlot: Boolean,
    placeholder: String,
    placeholderStyle: String,
    background: {
      type: String,
      value: "#ffffff"
    },
    maxlength: {
      type: Number,
      value: -1
    },
    shape: {
      type: String,
      value: "square"
    },
    label: String
  },
  methods: {
    onChange: function onChange(event) {
      this.set({
        value: event.detail
      });
      this.$emit("change", event.detail);
    },
    onCancel: function onCancel() {
      var _this = this;

      /**
       * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
       * // https://github.com/youzan/vant-weapp/issues/1768
       */
      setTimeout(function () {
        _this.set({
          value: ""
        });

        _this.$emit("cancel");

        _this.$emit("change", "");
      }, 200);
    },
    onSearch: function onSearch() {
      this.$emit("search", this.data.value);
    },
    onFocus: function onFocus() {
      this.$emit("focus");
    },
    onBlur: function onBlur() {
      this.$emit("blur");
    },
    onClear: function onClear() {
      this.$emit("clear");
    }
  }
});