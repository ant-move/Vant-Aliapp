"use strict";

var _link = require("../mixins/link");

var _component = require("../common/component");

(0, _component.VantComponent)({
  classes: ["title-class", "label-class", "value-class", "right-icon-class", "hover-class"],
  mixins: [_link.link],
  props: {
    title: null,
    value: null,
    icon: String,
    size: String,
    label: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    clickable: Boolean,
    titleWidth: String,
    customStyle: String,
    arrowDirection: String,
    useLabelSlot: Boolean,
    border: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit("click", event.detail);
      this.jumpLink();
    }
  }
});