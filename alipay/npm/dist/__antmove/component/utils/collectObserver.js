"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function collectObserver(observerObj, option, ctx) {
  Object.keys(option).forEach(function (prop) {
    if (_typeof(option[prop]) !== 'object' || !option[prop]) {
      return false;
    }

    if (option[prop].observer) {
      if (typeof option[prop].observer === 'string') {
        observerObj[prop] = ctx.methods[option[prop].observer];
      } else {
        observerObj[prop] = option[prop].observer;
      }
    }
  });
  return observerObj;
}

module.exports = collectObserver;