var antmove_export = {};
import antmove_1_module from '../wxs/utils.sjs';

/* eslint-disable */
var utils = antmove_1_module;

function iconStyle(checkedColor, value, disabled, parentDisabled, iconSize) {
  var styles = [['font-size', utils.addUnit(iconSize)]];

  if (checkedColor && value && !disabled && !parentDisabled) {
    styles.push(['border-color', checkedColor]);
    styles.push(['background-color', checkedColor]);
  }

  return styles.map(function (item) {
    return item.join(':');
  }).join(';');
}

antmove_export = {
  iconStyle: iconStyle
};
export default antmove_export;