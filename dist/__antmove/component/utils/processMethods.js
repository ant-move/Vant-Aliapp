"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function processMethods() {
  var _opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var methods = {};
  Object.keys(_opts.methods || {}).forEach(function (method) {
    var fn = _opts.methods[method];

    methods[method] = function () {
      for (var _len = arguments.length, p = new Array(_len), _key = 0; _key < _len; _key++) {
        p[_key] = arguments[_key];
      }

      if (p[0] && _typeof(p[0]) === 'object' && p[0].timeStamp && p[0].target) {
        this._currentEvent = p[0];
      }

      return fn.apply(this, p);
    };
  });
  _opts.methods = methods;
  return _opts;
}

module.exports = processMethods;