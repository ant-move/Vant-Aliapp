import { memoize as _memoize } from "./memoize.sjs";
import { bem as _bem } from "./bem.sjs";
var bem = _bem;
var memoize = _memoize;

function isSrc(url) {
  return url.indexOf('http') === 0 || url.indexOf('data:image') === 0 || url.indexOf('//') === 0;
}

export default {
  bem: bem,
  isSrc: isSrc,
  memoize: memoize
};