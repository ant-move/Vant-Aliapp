"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var config = require('../../api/config.js');

function updateData(param) {
  var _this = this;

  var ctx = this;

  if (_typeof(ctx.properties) === 'object') {
    ctx.properties.name = ctx.properties.name || '';
    ctx.properties.value = ctx.properties.value || null;
    Object.keys(ctx.properties).forEach(function (item) {
      // didupdate
      if (param && param[0][item] === _this.props[item]) {
        return false;
      }

      if (ctx.props[item] !== undefined && typeof ctx.props[item] !== 'function' && item[0] !== '$' && ctx.data[item] !== ctx.props[item]) {
        ctx.setData(_defineProperty({}, item, ctx.props[item]));
      }

      if (typeof ctx.props[item] === 'function' && config.env !== 'production') {
        console.warn('外部使用自定义组件时，如果传递参数是函数，请使用props获取，避免使用data获取');
      }
    });
  }
}

module.exports = updateData;