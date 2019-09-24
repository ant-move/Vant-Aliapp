"use strict";

var _component = require("../common/component");

var _safeArea = require("../mixins/safe-area");

(0, _component.VantComponent)({
  mixins: [(0, _safeArea.safeArea)()],
  classes: ["bar-class", "price-class", "button-class"],
  props: {
    tip: {
      type: null,
      observer: "updateTip"
    },
    tipIcon: String,
    type: Number,
    price: {
      type: null,
      observer: "updatePrice"
    },
    label: String,
    loading: Boolean,
    disabled: Boolean,
    buttonText: String,
    currency: {
      type: String,
      value: "¥"
    },
    buttonType: {
      type: String,
      value: "danger"
    },
    decimalLength: {
      type: Number,
      value: 2,
      observer: "updatePrice"
    },
    suffixLabel: String
  },
  didUpdate: function didUpdate() {
    var _this$data = this.data,
        price = _this$data.price,
        decimalLength = _this$data.decimalLength;
    this.set({
      hasPrice: typeof price === "number",
      priceStr: (price / 100).toFixed(decimalLength)
    });
    this.set({
      hasTip: typeof this.data.tip === "string"
    });
  },
  methods: {
    updatePrice: function updatePrice() {
      var _this$data2 = this.data,
          price = _this$data2.price,
          decimalLength = _this$data2.decimalLength;
      this.set({
        hasPrice: typeof price === "number",
        priceStr: (price / 100).toFixed(decimalLength)
      });
    },
    updateTip: function updateTip() {
      this.set({
        hasTip: typeof this.data.tip === "string"
      });
    },
    onSubmit: function onSubmit(event) {
      this.$emit("submit", event.detail);
    }
  }
});