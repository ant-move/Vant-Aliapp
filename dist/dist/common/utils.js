"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDef = isDef;
exports.isObj = isObj;
exports.isNumber = isNumber;
exports.range = range;
exports.nextTick = nextTick;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isDef(value) {
  return value !== undefined && value !== null;
}

function isObj(x) {
  var type = _typeof(x);

  return x !== null && (type === "object" || type === "function");
}

function isNumber(value) {
  return /^\d+$/.test(value);
}

function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

function nextTick(fn) {
  setTimeout(function () {
    fn();
  }, 1000 / 30);
}