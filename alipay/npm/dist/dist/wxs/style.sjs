var antmove_export = {};
import antmove_1_module from './object.sjs';
import antmove_2_module from './array.sjs';

/* eslint-disable */
var object = antmove_1_module;
var array = antmove_2_module;

function style(styles) {
  if (array.isArray(styles)) {
    return styles.filter(function (item) {
      return item != null;
    }).map(function (item) {
      return style(item);
    }).join(';');
  }

  if ('Object' === styles.constructor) {
    return object.keys(styles).filter(function (key) {
      return styles[key] != null;
    }).map(function (key) {
      return [key, [styles[key]]].join(':');
    }).join(';');
  }

  return styles;
}

antmove_export = style;
export default antmove_export;