var antmove_export = {};

function isObj(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

antmove_export = function (option, valueKey) {
  return isObj(option) && option[valueKey] != null ? option[valueKey] : option;
};

export default antmove_export;