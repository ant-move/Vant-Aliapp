"use strict";

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;
Component({
  properties: {
    group: Object
  },
  methods: {
    onClick: function onClick(event) {
      wx.navigateTo({
        url: event.target.dataset.url
      });
    },
    antmoveAction: function antmoveAction() {//执行时动态赋值，请勿删除
    }
  }
});