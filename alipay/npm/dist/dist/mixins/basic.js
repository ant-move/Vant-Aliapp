"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basic = void 0;

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;

function Behavior(behavior) {
  behavior.$id = Number(new Date()) + String(Math.random()).substring(2, 7);
  return behavior;
}

var basic = Behavior({
  methods: {
    $emit: function $emit(name, detail, options) {
      this.triggerEvent(name, detail, options);
    },
    set: function set(data, callback) {
      this.setData(data, callback);
      return new Promise(function (resolve) {
        return wx.nextTick(resolve);
      });
    },
    getRect: function getRect(selector, all) {
      var _this = this;

      return new Promise(function (resolve) {
        wx.createSelectorQuery()["in"](_this)[all ? "selectAll" : "select"](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }

          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    }
  }
});
exports.basic = basic;