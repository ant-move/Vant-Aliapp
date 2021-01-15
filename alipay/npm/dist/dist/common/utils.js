"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDef = isDef;
exports.isObj = isObj;
exports.range = range;
exports.nextTick = nextTick;
exports.getSystemInfoSync = getSystemInfoSync;
exports.addUnit = addUnit;
exports.requestAnimationFrame = requestAnimationFrame;
exports.pickExclude = pickExclude;
exports.getRect = getRect;
exports.getAllRect = getAllRect;
exports.toPromise = toPromise;

var _validator = require("./validator");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _my = require("../../__antmove/api/index.js")(my);

var wx = _my;

function isDef(value) {
  return value !== undefined && value !== null;
}

function isObj(x) {
  var type = _typeof(x);

  return x !== null && (type === "object" || type === "function");
}

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function nextTick(fn) {
  setTimeout(function () {
    fn();
  }, 1000 / 30);
}

var systemInfo;

function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync();
  }

  return systemInfo;
}

function addUnit(value) {
  if (!isDef(value)) {
    return undefined;
  }

  value = String(value);
  return (0, _validator.isNumber)(value) ? "".concat(value, "px") : value;
}

function requestAnimationFrame(cb) {
  var systemInfo = getSystemInfoSync();

  if (systemInfo.platform === "devtools") {
    return nextTick(cb);
  }

  return wx.createSelectorQuery().selectViewport().boundingClientRect().exec(function () {
    cb();
  });
}

function pickExclude(obj, keys) {
  if (!(0, _validator.isPlainObject)(obj)) {
    return {};
  }

  return Object.keys(obj).reduce(function (prev, key) {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }

    return prev;
  }, {});
}

function getRect(selector) {
  var _this = this;

  return new Promise(function (resolve) {
    wx.createSelectorQuery()["in"](_this).select(selector).boundingClientRect().exec(function () {
      var rect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return resolve(rect[0]);
    });
  });
}

function getAllRect(selector) {
  var _this2 = this;

  return new Promise(function (resolve) {
    wx.createSelectorQuery()["in"](_this2).selectAll(selector).boundingClientRect().exec(function () {
      var rect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return resolve(rect[0]);
    });
  });
}

function toPromise(promiseLike) {
  if ((0, _validator.isPromise)(promiseLike)) {
    return promiseLike;
  }

  return Promise.resolve(promiseLike);
}