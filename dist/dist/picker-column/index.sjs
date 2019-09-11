function isObj(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export default (function (option, valueKey) {
  return isObj(option) && option[valueKey] != null ? option[valueKey] : option;
});