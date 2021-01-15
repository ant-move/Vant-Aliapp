"use strict";

var _component = require("../common/component");

(0, _component.VantComponent)({
  props: {
    options: Array,
    showBorder: Boolean
  },
  methods: {
    onSelect: function onSelect(event) {
      var index = event.currentTarget.dataset.index;
      var option = this.data.options[index];
      this.$emit("select", Object.assign(Object.assign({}, option), {
        index: index
      }));
    }
  }
});