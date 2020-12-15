var antmove_export = {};

/* eslint-disable */
var REGEXP = getRegExp('{|}|"', 'g');

function keys(obj) {
  return JSON.stringify(obj).replace(REGEXP, '').split(',').map(function (item) {
    return item.split(':')[0];
  });
}

antmove_export.keys = keys;
export default antmove_export;