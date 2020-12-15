var antmove_export = {};
import antmove_1_module from '../wxs/utils.sjs';

/* eslint-disable */
var utils = antmove_1_module;

function inputStyle(autosize) {
  if (autosize && autosize.constructor === 'Object') {
    var style = '';

    if (autosize.minHeight) {
      style += 'min-height:' + utils.addUnit(autosize.minHeight) + ';';
    }

    if (autosize.maxHeight) {
      style += 'max-height:' + utils.addUnit(autosize.maxHeight) + ';';
    }

    return style;
  }

  return '';
}

antmove_export = {
  inputStyle: inputStyle
};
export default antmove_export;