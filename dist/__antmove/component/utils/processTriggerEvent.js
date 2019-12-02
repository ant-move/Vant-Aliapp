"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function processDataSet(e) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (e.timeStamp === undefined) {
    e = _objectSpread({}, e, {
      target: {
        dataset: {}
      },
      currentTarget: {
        dataset: {}
      }
    });
  }

  Object.keys(props).forEach(function (prop) {
    if (prop.match(/^data-/)) {
      var originProp = prop;
      prop = prop.replace(/[A-Z]/g, function ($) {
        return $.toLowerCase();
      });
      prop = prop.split('-');
      prop.shift();
      prop = prop.join('');
      e.target.dataset[prop] = props[originProp];
      e.currentTarget.dataset[prop] = props[originProp];
    }
  });
  return e;
}

function processTriggerEvent() {
  this.triggerEvent = function (event) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var e = this._currentEvent;
    var eventType = event[0].toLowerCase() + event.substring(1);
    event = 'on' + event[0].toUpperCase() + event.substring(1);
    e.type = eventType;
    e = processDataSet(e, this.props);
    event = event.replace(/-\w+/, function (name) {
      name = name[1].toUpperCase() + name.substring(2);
      return name;
    });

    if (typeof this.props[event] === 'function') {
      if (e) {
        e.detail = e.detail || {};

        if (Array.isArray(data)) {
          e.detail = data;
        } else if (_typeof(data) === 'object') {
          e.detail = _objectSpread({}, e.detail, {}, data);
        } else {
          e.detail = data;
        }
      }

      this.props[event](e, data, opts);
    }
  };
}

module.exports = processTriggerEvent;