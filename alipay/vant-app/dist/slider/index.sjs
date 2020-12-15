var antmove_export = {};
import antmove_1_module from '../wxs/utils.sjs';

/* eslint-disable */
var utils = antmove_1_module;

function barStyle(barHeight, activeColor) {
  var styles = [['height', utils.addUnit(barHeight)]];

  if (activeColor) {
    styles.push(['background', activeColor]);
  }

  return styles.map(function (item) {
    return item.join(':');
  }).join(';');
}

antmove_export = {
  barStyle: barStyle
};
export default antmove_export;