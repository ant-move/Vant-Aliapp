"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;
exports.isPlainObject = isPlainObject;
exports.isPromise = isPromise;
exports.isDef = isDef;
exports.isObj = isObj;
exports.isNumber = isNumber;
exports.isBoolean = isBoolean;
exports.isImageUrl = isImageUrl;
exports.isVideoUrl = isVideoUrl;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isFunction(val) {
  return typeof val === "function";
}

function isPlainObject(val) {
  return val !== null && _typeof(val) === "object" && !Array.isArray(val);
}

function isPromise(val) {
  return isPlainObject(val) && isFunction(val.then) && isFunction(val["catch"]);
}

function isDef(value) {
  return value !== undefined && value !== null;
}

function isObj(x) {
  var type = _typeof(x);

  return x !== null && (type === "object" || type === "function");
}

function isNumber(value) {
  return /^\d+(\.\d+)?$/.test(value);
}

function isBoolean(value) {
  return typeof value === "boolean";
}

var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
var VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv)/i;

function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}

function isVideoUrl(url) {
  return VIDEO_REGEXP.test(url);
}