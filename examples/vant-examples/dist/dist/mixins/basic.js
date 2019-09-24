"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basic = void 0;

var _my = require("../../__antmove/api/index.js")(my);

function Behavior(behavior) {
  return behavior;
}

var basic = Behavior({
  methods: {
    $emit: function $emit() {
      this.triggerEvent.apply(this, arguments);
    },
    getRect: function getRect(selector, all) {
      var _this = this;

      return new Promise(function (resolve) {
        var res = _my.createSelectorQuery();

        res["in"](_this)[all ? "selectAll" : "select"](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            if (rect[0] && Array.isArray(rect[0])) {
              resolve(rect[0]);
            } else {
              resolve(rect);
            }
          }

          if (!all && rect) {
            if (rect[0] && Array.isArray(rect[0])) {
              resolve(rect[0]);
            } else {
              resolve(rect);
            }
          }
        }).exec();
      });
    }
  }
});
exports.basic = basic;