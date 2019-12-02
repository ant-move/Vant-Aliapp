"use strict";

function compatibleLifetime(options) {
  var _life = {};

  if (options && options.lifetimes) {
    _life = options.lifetimes;
  } else if (options) {
    _life = options;
  }

  return _life;
}

module.exports = compatibleLifetime;