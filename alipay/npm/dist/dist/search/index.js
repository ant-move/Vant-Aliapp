"use strict";

var _component = require("../common/component");

var _version = require("../common/version");

(0, _component.VantComponent)({
  field: true,
  classes: ["field-class", "input-class", "cancel-class"],
  props: {
    label: String,
    focus: Boolean,
    error: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    inputAlign: String,
    showAction: Boolean,
    useActionSlot: Boolean,
    useLeftIconSlot: Boolean,
    useRightIconSlot: Boolean,
    leftIcon: {
      type: String,
      value: "search"
    },
    rightIcon: String,
    placeholder: String,
    placeholderStyle: String,
    actionText: {
      type: String,
      value: "取消"
    },
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
    clearable: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onChange: function onChange(event) {
      if ((0, _version.canIUseModel)()) {
        this.setData({
          value: event.detail
        });
      }

      this.$emit("change", event.detail);
    },
    onCancel: function onCancel() {
      var _this = this;

      /**
       * 修复修改输入框值时，输入框失焦和赋值同时触发，赋值失效
       * https://github.com/youzan/@vant/weapp/issues/1768
       */
      setTimeout(function () {
        if ((0, _version.canIUseModel)()) {
          _this.setData({
            value: ""
          });
        }

        _this.$emit("cancel");

        _this.$emit("change", "");
      }, 200);
    },
    onSearch: function onSearch(event) {
      this.$emit("search", event.detail);
    },
    onFocus: function onFocus(event) {
      this.$emit("focus", event.detail);
    },
    onBlur: function onBlur(event) {
      this.$emit("blur", event.detail);
    },
    onClear: function onClear(event) {
      this.$emit("clear", event.detail);
    }
  }
});