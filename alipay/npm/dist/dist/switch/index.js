"use strict";

var _component = require("../common/component");

var _color = require("../common/color");

(0, _component.VantComponent)({
  field: true,
  classes: ["node-class"],
  props: {
    checked: {
      type: null,
      observer: function observer(value) {
        var loadingColor = this.getLoadingColor(value);
        this.setData({
          value: value,
          loadingColor: loadingColor
        });
      }
    },
    loading: Boolean,
    disabled: Boolean,
    activeColor: String,
    inactiveColor: String,
    size: {
      type: String,
      value: "30px"
    },
    activeValue: {
      type: null,
      value: true
    },
    inactiveValue: {
      type: null,
      value: false
    }
  },
  created: function created() {
    var value = this.data.checked;
    var loadingColor = this.getLoadingColor(value);
    this.setData({
      value: value,
      loadingColor: loadingColor
    });
  },
  methods: {
    getLoadingColor: function getLoadingColor(checked) {
      var _this$data = this.data,
          activeColor = _this$data.activeColor,
          inactiveColor = _this$data.inactiveColor;
      return checked ? activeColor || _color.BLUE : inactiveColor || _color.GRAY_DARK;
    },
    onClick: function onClick() {
      var _this$data2 = this.data,
          activeValue = _this$data2.activeValue,
          inactiveValue = _this$data2.inactiveValue;

      if (!this.data.disabled && !this.data.loading) {
        var checked = this.data.checked === activeValue;
        var value = checked ? inactiveValue : activeValue;
        this.$emit("input", value);
        this.$emit("change", value);
      }
    }
  }
});