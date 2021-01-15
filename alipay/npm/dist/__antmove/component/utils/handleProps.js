"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function handleProps() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  opts.props = opts.props || {};

  if (opts.relations) {
    opts.props.theRelations = opts.relations;
  }

  if (!opts.properties) {
    return false;
  }

  Object.keys(opts.properties).forEach(function (prop) {
    var val = opts.properties[prop];

    if (!val) {
      opts.props[prop] = val;
      return false;
    }

    if (typeof val === 'function') {
      var _obj;

      var obj = (_obj = {}, _defineProperty(_obj, Boolean, false), _defineProperty(_obj, String, ''), _defineProperty(_obj, Array, []), _defineProperty(_obj, Object, {}), _obj);
      opts.props[prop] = obj[val];
      return false;
    }

    if (val.hasOwnProperty('value')) {
      opts.props[prop] = val.value;
    } else if (val.type !== 'observer') {
      var _info;

      var info = (_info = {}, _defineProperty(_info, String, ''), _defineProperty(_info, Number, 0), _defineProperty(_info, Object, {}), _defineProperty(_info, null, null), _info);
      opts.props[prop] = info[val.type];
    }
  });
}

module.exports = handleProps;