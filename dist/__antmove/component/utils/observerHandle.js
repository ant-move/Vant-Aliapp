"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function observerHandle(observerObj, args, that) {
  var isInit = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  Object.keys(observerObj).forEach(function (obs) {
    if (isInit && that.props[obs] === undefined) return false;

    if (args[0][obs] !== that.props[obs] && typeof observerObj[obs] === 'function') {
      observerObj[obs].call(that, that.props[obs], args[0][obs]);
    }
  });
}

function observersHandle(observersObj, args, that) {
  Object.keys(observersObj).forEach(function (obs) {
    var left = {};
    var right = {};

    if (obs.match(/\./)) {
      var _dataArr = obs.split('.');

      left = processChildAttr(args[1], _dataArr);
      right = processChildAttr(that.data, _dataArr);
    } else {
      left = args[1][obs];
      right = that.data[obs];
    }

    if (_typeof(left) === 'object' && _typeof(right) === 'object') {
      var dif = deep(left, right);

      if (dif && typeof observersObj[obs].fn === "function") {
        var _observersObj$obs$fn;

        (_observersObj$obs$fn = observersObj[obs].fn).call.apply(_observersObj$obs$fn, [that].concat(_toConsumableArray(observersObj[obs].arr)));
      }
    } else if (typeof observersObj[obs].fn === "function" && left !== right) {
      var _observersObj$obs$fn2;

      (_observersObj$obs$fn2 = observersObj[obs].fn).call.apply(_observersObj$obs$fn2, [that].concat(_toConsumableArray(observersObj[obs].arr)));
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

function deep(args, props) {
  if (args === props === null) return false;
  if (args === null || args === null) return true;
  var isDif = false;

  for (var v in props) {
    if (args.hasOwnProperty(v)) {
      if (_typeof(args[v]) !== _typeof(props[v])) {
        isDif = true;
        return isDif;
      } else if (_typeof(args[v]) === "object" && _typeof(props[v]) === "object") {
        deep(args[v], props[v]);
      } else if (typeof args[v] === "Number" || typeof props[v] === "Number") {} else if (args[v] !== props[v]) {
        isDif = true;
      }
    } else {
      isDif = true;
      return isDif;
    }
  }

  for (var v in args) {
    if (props.hasOwnProperty(v)) {
      if (_typeof(args[v]) !== _typeof(props[v])) {
        isDif = true;
        return isDif;
      } else if (_typeof(args[v]) === "object" || _typeof(props[v]) === "object") {
        deep(args[v], props[v]);
      } else if (args[v] !== props[v]) {
        isDif = true;
      }
    } else {
      isDif = true;
      return isDif;
    }
  }

  return isDif;
}

module.exports = {
  observerHandle: observerHandle,
  observersHandle: observersHandle
};