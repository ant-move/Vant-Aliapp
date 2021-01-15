"use strict";

module.exports = function nextUid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
  return Math.random().toString(36).substr(len + 1);
};