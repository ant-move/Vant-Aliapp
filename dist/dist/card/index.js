"use strict";

var _link = require("../mixins/link");

var _component = require("../common/component");

(0, _component.VantComponent)({
  classes: ["num-class", "desc-class", "thumb-class", "title-class", "price-class", "origin-price-class"],
  mixins: [_link.link],
  props: {
    tag: String,
    num: String,
    desc: String,
    thumb: String,
    title: String,
    price: String,
    centered: Boolean,
    lazyLoad: Boolean,
    thumbLink: String,
    originPrice: String,
    thumbMode: {
      type: String,
      value: "aspectFit"
    },
    currency: {
      type: String,
      value: "¥"
    }
  },
  methods: {
    onClickThumb: function onClickThumb() {
      this.jumpLink("thumbLink");
    }
  }
});