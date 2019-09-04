"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observe = observe;

var _behavior = require("./behavior");

var _props = require("./props");

function observe(vantOptions, options) {
  var watch = vantOptions.watch,
      computed = vantOptions.computed;
  options.behaviors.push(_behavior.behavior);

  if (watch) {
    var props = options.properties || {};
    Object.keys(watch).forEach(function (key) {
      if (key in props) {
        var prop = props[key];

        if (prop === null || !("type" in prop)) {
          prop = {
            type: prop
          };
        }

        prop.observer = watch[key];
        props[key] = prop;
      }
    });
    options.properties = props;
  }

  if (computed) {
    options.methods = options.methods || {};

    options.methods.$options = function () {
      return vantOptions;
    };

    if (options.properties) {
      (0, _props.observeProps)(options.properties);
    }
  }
}