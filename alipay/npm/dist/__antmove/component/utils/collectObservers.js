"use strict";

var _require = require('./observerHandle'),
    observersHandle = _require.observersHandle;

function collectObservers(observersObj, options, param) {
  var self = this;

  var _loop = function _loop(key) {
    if (options.observers.hasOwnProperty(key)) {
      var keyArr = key.split(',');
      var arr = [];
      keyArr.forEach(function (its) {
        its = its.trim();
        var attr = {};

        if (its.match(/\./)) {
          var _attr = its.split('.');

          attr = processChildAttr(self.data, _attr);
        } else {
          attr = self.data[its];
        }

        arr.push(attr);
      });
      keyArr.forEach(function (its) {
        its = its.trim();
        observersObj[its] = Object.create(null);
        observersObj[its].fn = options.observers[key];
        observersObj[its].arr = arr;
      });
    }
  };

  for (var key in options.observers) {
    _loop(key);
  }

  observersHandle(observersObj, param, self);
}

function processChildAttr(attr, arr) {
  var _ = attr;
  arr.forEach(function (name) {
    _ = _[name];
  });
  return _;
}

module.exports = collectObservers;