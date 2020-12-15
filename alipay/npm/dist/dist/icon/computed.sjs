var antmove_export = {};
import antmove_1_module from '../wxs/utils.sjs';

/* eslint-disable */
var utils = antmove_1_module;

function isImage(name) {
  return name.indexOf('/') !== -1;
}

function rootClass(data) {
  var classes = [];

  if (data.classPrefix != null) {
    classes.push(data.classPrefix);
  }

  if (isImage(data.name)) {
    classes.push('van-icon--image');
  } else if (data.classPrefix != null) {
    classes.push(data.classPrefix + '-' + data.name);
  }

  return classes.join(' ');
}

function rootStyle(data) {
  var styles = [];

  if (data.color) {
    styles.push(['color', data.color]);
  }

  if (data.size) {
    styles.push(['font-size', utils.addUnit(data.size)]);
  }

  if (data.customStyle) {
    styles.push([data.customStyle]);
  }

  return styles.map(function (pair) {
    return pair.join(':');
  }).join(';');
}

antmove_export = {
  isImage: isImage,
  rootClass: rootClass,
  rootStyle: rootStyle
};
export default antmove_export;