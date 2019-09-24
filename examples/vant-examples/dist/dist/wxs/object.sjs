/* eslint-disable */
var REGEXP = getRegExp('{|}|"', 'g');

function keys(obj) {
  return JSON.stringify(obj).replace(REGEXP, '').split(',').map(function (item) {
    return item.split(':')[0];
  });
}

export default {
  keys: keys
};