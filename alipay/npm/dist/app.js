"use strict";

require("./__antmove/component/componentClass.js");

my.global = {};

var _my = require("./__antmove/api/index.js")(my);

var wx = _my;
App({
  globalData: {},
  onLaunch: function onLaunch() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "production-7dtfw"
      });
    }
  }
});