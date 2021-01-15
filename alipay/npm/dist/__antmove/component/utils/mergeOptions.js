"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function mergeOptions(parent, child) {
  Object.keys(parent).forEach(function (key) {
    var val = parent[key];
    var _val = child[key];

    if (Array.isArray(_val)) {
      return false;
    }

    if (child[key] === undefined) {
      child[key] = parent[key];
    }

    if (_typeof(val) === 'object' && _typeof(_val) === 'object') {
      child[key] = Object.assign({}, _val, val);
    } else if (typeof val === 'function' && typeof _val === 'function') {
      child[key] = function () {
        for (var _len = arguments.length, p = new Array(_len), _key = 0; _key < _len; _key++) {
          p[_key] = arguments[_key];
        }

        val.apply(this, p);

        _val.apply(this, p);
      };
    }
  });
}

module.exports = mergeOptions;