"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canIUseModel = canIUseModel;
exports.canIUseFormFieldButton = canIUseFormFieldButton;
exports.canIUseAnimate = canIUseAnimate;

var _utils = require("./utils");

function compareVersion(v1, v2) {
  v1 = v1.split(".");
  v2 = v2.split(".");
  var len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push("0");
  }

  while (v2.length < len) {
    v2.push("0");
  }

  for (var i = 0; i < len; i++) {
    var num1 = parseInt(v1[i], 10);
    var num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    }

    if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

function canIUseModel() {
  var system = (0, _utils.getSystemInfoSync)();
  return compareVersion(system.SDKVersion, "2.9.3") >= 0;
}

function canIUseFormFieldButton() {
  var system = (0, _utils.getSystemInfoSync)();
  return compareVersion(system.SDKVersion, "2.10.3") >= 0;
}

function canIUseAnimate() {
  var system = (0, _utils.getSystemInfoSync)();
  return compareVersion(system.SDKVersion, "2.9.0") >= 0;
}