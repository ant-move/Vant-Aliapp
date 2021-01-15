"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 把props的data属性，处理成dataset
 * { 'data-alpha-beta': 3 }
 * { alphaBeta: 3 }
 */
function processDataSet(e) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (e.timeStamp === undefined) {
    e = _objectSpread(_objectSpread({}, e), {}, {
      target: {
        dataset: {}
      },
      currentTarget: {
        dataset: {}
      }
    });
  }

  Object.keys(props).forEach(function (prop) {
    var matched = prop.match(/^data-(.+)/);

    if (matched) {
      var key = matched[1].replace(/-(\w)/, function ($0, $1) {
        return $1.toUpperCase();
      });
      e.target.dataset[key] = props[prop];
      e.currentTarget.dataset[key] = props[prop];
    }
  });
  return e;
}

module.exports = processDataSet;