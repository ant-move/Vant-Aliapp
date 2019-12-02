"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function updateData(param) {
  var _this = this;

  var ctx = this;

  if (_typeof(ctx.properties) === 'object') {
    ctx.properties.name = ctx.properties.name || '';
    ctx.properties.value = ctx.properties.value || null;
    Object.keys(ctx.properties).forEach(function (item) {
      // didupdate
      if (param && param[0][item] === _this.props[item]) return false;

      if (ctx.props[item] !== undefined && typeof ctx.props[item] !== 'function' && item[0] !== '$' && ctx.data[item] !== ctx.props[item]) {
        ctx.setData(_defineProperty({}, item, ctx.props[item]));
      }
    });
  }
}

module.exports = updateData;