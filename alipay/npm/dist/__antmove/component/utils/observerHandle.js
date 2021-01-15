"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var equals = function equals(x, y) {
  if (x === y) {
    return true;
  }

  if (!(x instanceof Object) || !(y instanceof Object)) {
    return false;
  }

  if (x.constructor !== y.constructor) {
    return false;
  }

  for (var p in x) {
    if (x.hasOwnProperty(p)) {
      if (!y.hasOwnProperty(p)) {
        return false;
      }

      if (x[p] === y[p]) {
        continue;
      }

      if (_typeof(x[p]) !== 'object') {
        return false;
      }

      if (!equals(x[p], y[p])) {
        return false;
      }
    }
  }

  for (var _p in y) {
    if (y.hasOwnProperty(_p) && !x.hasOwnProperty(_p)) {
      return false;
    }
  }

  return true;
};

function observerHandle(observerObj, args, that) {
  Object.keys(observerObj).forEach(function (obs) {
    if (typeof observerObj[obs] === 'function') {
      var props;

      if (args.props) {
        props = args.props;
      }

      if (args[0]) {
        props = args[0];
      }

      if (!props) {
        return;
      }

      if (!equals(props[obs], that.props[obs])) {
        observerObj[obs].call(that, that.props[obs], props[obs]);
      }
    }
  });
}

function observersHandle(observersObj, args, that) {
  var preData = null;

  if (Array.isArray(args)) {
    preData = args[1];
  } else {
    preData = args.props;
  }

  Object.keys(observersObj).forEach(function (obs) {
    var left = {};
    var right = {};

    if (obs.match(/\./)) {
      var _dataArr = obs.split('.');

      left = processChildAttr(preData, _dataArr);
      right = processChildAttr(that.data, _dataArr);
    } else {
      left = preData[obs];
      right = that.data[obs];
    }

    var dif = equals(left, right);

    if (!dif) {
      var _observersObj$obs$fn;

      (_observersObj$obs$fn = observersObj[obs].fn).call.apply(_observersObj$obs$fn, [that].concat(_toConsumableArray(observersObj[obs].arr)));
    }
  });
}

function processChildAttr(attr, arr) {
  var _ = attr;
  arr.forEach(function (name) {
    _ = _[name];
  });
  return _;
}

module.exports = {
  observerHandle: observerHandle,
  observersHandle: observersHandle
};