"use strict";

function handleExternalClasses() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var arr = opts.externalClasses || [];
  var _class = [];
  arr.forEach(function (a) {
    _class.push(_transform(a) || '');
  });
  opts.data = opts.data || {};
  opts.data.__classNames = _class;
  opts.data.__classes = '';

  function _transform() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    str = str.replace(/-(\w)/g, function () {
      for (var _len = arguments.length, $ = new Array(_len), _key = 0; _key < _len; _key++) {
        $[_key] = arguments[_key];
      }

      return $[1].toUpperCase();
    });
    return str || '';
  }

  return opts;
}

module.exports = handleExternalClasses;