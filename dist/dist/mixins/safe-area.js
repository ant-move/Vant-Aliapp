"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeArea = void 0;

var _my = require("../../__antmove/api/index.js")(my);

function Behavior(behavior) {
  return behavior;
}

var cache = null;

function getSafeArea() {
  return new Promise(function (resolve, reject) {
    if (cache != null) {
      resolve(cache);
    } else {
      _my.getSystemInfo({
        success: function success(_ref) {
          var model = _ref.model,
              screenHeight = _ref.screenHeight,
              statusBarHeight = _ref.statusBarHeight;
          var iphoneX = /iphone x/i.test(model);
          var iphoneNew = /iPhone11/i.test(model) && screenHeight === 812;
          cache = {
            isIPhoneX: iphoneX || iphoneNew,
            statusBarHeight: statusBarHeight
          };
          resolve(cache);
        },
        fail: reject
      });
    }
  });
}

var safeArea = function safeArea() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$safeAreaInsetBo = _ref2.safeAreaInsetBottom,
      safeAreaInsetBottom = _ref2$safeAreaInsetBo === void 0 ? true : _ref2$safeAreaInsetBo,
      _ref2$safeAreaInsetTo = _ref2.safeAreaInsetTop,
      safeAreaInsetTop = _ref2$safeAreaInsetTo === void 0 ? false : _ref2$safeAreaInsetTo;

  return Behavior({
    properties: {
      safeAreaInsetTop: {
        type: Boolean,
        value: safeAreaInsetTop
      },
      safeAreaInsetBottom: {
        type: Boolean,
        value: safeAreaInsetBottom
      }
    },
    created: function created() {
      var _this = this;

      getSafeArea().then(function (_ref3) {
        var isIPhoneX = _ref3.isIPhoneX,
            statusBarHeight = _ref3.statusBarHeight;

        _this.set({
          isIPhoneX: isIPhoneX,
          statusBarHeight: statusBarHeight
        });
      });
    }
  });
};

exports.safeArea = safeArea;